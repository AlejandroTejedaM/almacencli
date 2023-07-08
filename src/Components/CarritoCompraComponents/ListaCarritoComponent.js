import React, {useEffect, useState} from "react";
import productoService from "../../Services/ProductoService";
import cajeroService from "../../Services/CajeroService";
import ventaService from "../../Services/VentaService";
import DetalleVentaService from "../../Services/DetalleVentaService";
import AutorizacionPagoService from "../../Services/AutorizacionPagoService";

export default function ListaCarritoComponent() {
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0.0);
    const [cajeros, setCajeros] = useState([]);
    const [cajeroSeleccionado, setCajeroSeleccionado] = useState(null);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetchProductos();
        fetchCajeros();
    }, []);

    useEffect(() => {
        if (cajeros.length > 0) {
            setCajeroSeleccionado(cajeros[0]);
        }
    }, [cajeros]);

    useEffect(() => {
        calcularTotal();
    }, [carrito]);

    const fetchProductos = () => {
        productoService
            .findAll()
            .then((response) => {
                setProductos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const fetchCajeros = () => {
        cajeroService
            .findAll()
            .then((response) => {
                setCajeros(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const calcularTotal = () => {
        let total = 0.0;
        carrito.forEach((producto) => {
            total += producto.cantidad * producto.precioUnitario;
        });
        setTotal(total);
    };

    const agregarProductoAlCarrito = async (producto) => {
        const response = await productoService.findById(producto.productoId);
        const stock = response.data.stock;
        if (stock > 0) {
            const productoExistente = carrito.some((p) => p.productoId === producto.productoId);
            if (productoExistente) {
                aumentarCantidadProducto(producto.productoId)
                alert("El producto ya existe en el carrito");
            } else {
                const nuevoProducto = {
                    productoId: producto.productoId,
                    nombre: producto.nombre,
                    cantidad: 1,
                    precioUnitario: parseFloat(producto.precio),
                };

                setCarrito((prevCarrito) => [...prevCarrito, nuevoProducto]);
                calcularTotal(); // Actualizar el total
            }
        } else {
            alert("No hay stock suficiente");
        }
    };

    const eliminarProductoDelCarrito = (productoId) => {
        setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.productoId !== productoId));
    };

    const aumentarCantidadProducto = (productoId) => {
        setCarrito((prevCarrito) => prevCarrito.map((producto) => {
            if (producto.productoId === productoId) {
                const nuevaCantidad = producto.cantidad + 1;
                const stockDisponible = obtenerStockDisponible(productoId);

                if (nuevaCantidad <= stockDisponible) {
                    return {
                        ...producto, cantidad: nuevaCantidad,
                    };
                } else {
                    alert("Stock insuficiente")
                }
            }
            return producto;
        }));
    };

    const obtenerStockDisponible = (productoId) => {
        const producto = productos.find((p) => p.productoId === productoId);
        return producto ? producto.stock : 0;
    };

    const disminuirCantidadProducto = (productoId) => {
        setCarrito((prevCarrito) => prevCarrito.map((producto) => {
            if (producto.productoId === productoId) {
                const nuevaCantidad = producto.cantidad - 1;
                if (nuevaCantidad > 0) {
                    return {
                        ...producto, cantidad: nuevaCantidad,
                    };
                }
            }
            return producto;
        }));
    };

    const realizarVenta = async () => {
        try {
            if(carrito.length > 0){

                const ventaData = {
                    total: total, fechaVenta: new Date().toISOString().split("T")[0], cajero: cajeroSeleccionado,
                };

                const ventaPosicion = {}
                const responseVenta = await ventaService.create(ventaData);
                const ventaId = responseVenta.data.ventaId;

                for (const producto of carrito) {
                    const responseProducto = await productoService.findById(producto.productoId);
                    const productoF = responseProducto.data;

                    let ventaF = {}
                    const responseVenta = await ventaService.findById(ventaId).then((response) => {
                        ventaF = response.data
                        ventaPosicion.ventaId = ventaId
                        ventaPosicion.fechaVenta = ventaF.fechaVenta
                        ventaPosicion.cajero = ventaF.cajero
                        console.log(ventaId)
                    }).catch((error) => {
                        console.log(error);
                    })

                    const detalleVenta = {
                        producto: productoF,
                        venta: ventaPosicion,
                        cantidad: producto.cantidad,
                        precioUnitario: producto.precioUnitario,
                    };
                    console.log(detalleVenta)
                    await DetalleVentaService.create(detalleVenta);
                    await actualizarStockProducto(producto.productoId, producto.cantidad);
                }

                const autorizacionPagoData = {
                    venta: ventaPosicion, monto: total, fechaAutorizacion: new Date().toISOString().split("T")[0],
                };
                await AutorizacionPagoService.create(autorizacionPagoData);

                setCarrito([]);
                setTotal(0.0);
                alert("La venta se ha realizado correctamente.");
            }else{
                alert("El carrito se encuentra vacio")
            }

        } catch (error) {
            console.log(error);
            alert("Error al realizar la venta. Por favor, inténtalo nuevamente.");
        }
    };

    const actualizarStockProducto = async (productoId, cantidad) => {
        try {
            const response = await productoService.findById(productoId);
            const producto = response.data;
            const stockActualizado = producto.stock - cantidad;
            producto.stock = stockActualizado;
            await productoService.update(productoId, producto);
            fetchProductos();
        } catch (error) {
            console.log(error);
        }
    };

    return (<div className="container">
        <div className="form-group mb-2">
            <h2 className="text-center">Productos</h2>
            <label className="form-label">Cajeros</label>
            <select
                className="form-control"
                onChange={(e) => {
                    cajeroService.findByID(e.target.value).then((response) => {
                        const cajero = response.data;
                        setCajeroSeleccionado(cajero)
                    }).catch((error) => {
                        console.log(error);
                    })
                }}
                placeholder={cajeroSeleccionado}
                required
            >
                {cajeros.map((cajero) => (<option key={cajero.cajeroId} value={cajero.cajeroId}>
                    {cajero.nombre} {cajero.apePat} {cajero.apeMat}
                </option>))}
            </select>
        </div>
        <table className="table table-dark table-border table-striped">
            <thead className="text-white text-center" style={{backgroundColor: "black"}}>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo Cerveza</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Stock</th>
                <th>Opciones</th>
            </tr>
            </thead>
            <tbody className="text-center">
            {productos.map((producto) => (<tr key={producto.productoId}>
                <td>{producto.productoId}</td>
                <td>{producto.nombre}</td>
                <td>{producto.tipoCerveza.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.stock}</td>
                <td>
                    <button
                        className="btn btn-success"
                        onClick={() => agregarProductoAlCarrito(producto)}
                    >
                        Seleccionar
                    </button>
                </td>
            </tr>))}
            </tbody>
        </table>
        <h2 className="text-center">Carrito</h2>
        <table className="table table-dark table-border table-striped">
            <thead className="text-white text-center" style={{backgroundColor: "black"}}>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody className="text-center">
            {carrito.map((producto) => (<tr key={producto.productoId}>
                <td>{producto.productoId}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precioUnitario}</td>
                <td>{producto.cantidad}</td>
                <td>
                    <div className="edit-buttons">
                        <button
                            className="btn btn-danger"
                            onClick={() => disminuirCantidadProducto(producto.productoId)}
                        >
                            -
                        </button>
                        <button
                            className="btn btn-success"
                            onClick={() => aumentarCantidadProducto(producto.productoId)}
                        >
                            +
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => eliminarProductoDelCarrito(producto.productoId)}
                        >
                            Eliminar
                        </button>
                    </div>
                </td>
            </tr>))}
            </tbody>
        </table>
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <h2>Total: ${total}</h2>
            <button className="btn btn-primary" onClick={realizarVenta}>
                Realizar venta
            </button>
        </div>
    </div>)
};