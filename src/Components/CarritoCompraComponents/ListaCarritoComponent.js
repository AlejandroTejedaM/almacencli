import React, {useEffect, useState} from "react";
import productoService from "../../Services/ProductoService";
import cajeroService from "../../Services/CajeroService";
import ProductoService from "../../Services/ProductoService";
import ventaService from "../../Services/VentaService";
import DetalleVentaService from "../../Services/DetalleVentaService";
import AutorizacionPagoService from "../../Services/AutorizacionPagoService";

export default function ListaCarritoComponent() {

    const [carrito, setCarrito] = useState([]);


    //Venta
    const [ventas, setVentas] = useState([]);

    const [ventaId, setVentaId] = useState('');
    const [total, setTotal] = useState(0.0);
    const [fechaVenta, setFechaVenta] = useState('');
    const [cajero, setCajero] = useState({});
    const ventaPosicion = {ventaId, total, fechaVenta, cajero};

    //Producto
    const [productos, setProductos] = useState([]);
    const [stock, setStock] = useState(0);
    const [productoId, setProductoId] = useState('')
    const [nombreProducto, setNombreProducto] = useState('');
    const [tipoCerveza, setTipoCerveza] = useState({});
    const [precio, setPrecio] = useState(0.0);
    const [descripcion, setDescripcion] = useState('');
    const [stockP, setStockP] = useState(0);
    const productoSeleccionado = {productoId, nombreProducto, tipoCerveza, precio, descripcion, stockP};

    //Cajero
    const [cajeros, setCajeros] = useState([]);
    const [cajeroId, setCajeroId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apePat, setApePat] = useState('');
    const [apeMat, setApeMat] = useState('');
    const [salario, setSalario] = useState(0.0);

    const cajeroSeleccionado = {cajeroId, nombre, apePat, apeMat, salario}


    useEffect(() => {
        listaProdutos();
        listaCajeros();
    }, [])

    useEffect(() => {
        primerCajeroLoad();
    })

    const primerCajeroLoad = () => {
        if (cajeros.length !== 0) {
            const cajero = cajeros[0];
            cajeroSeleccionado.cajeroId = cajero.cajeroId
            cajeroSeleccionado.nombre = cajero.nombre
            cajeroSeleccionado.apePat = cajero.apePat
            cajeroSeleccionado.apeMat = cajero.apeMat
            cajeroSeleccionado.salario = cajero.salario
        }
    }
    const listaProdutos = () => {
        productoService.findAll().then(response => {
            setProductos(response.data);
            const contador = 0;
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }
    const listaCajeros = () => {
        cajeroService.findAll().then(response => {
            setCajeros(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const CalculoTotal = (carrito) => {
        let sumaTotal = 0.0;
        if (Array.isArray(carrito)) {
            for (const producto of carrito) {
                const {cantidad, precioUnitario} = producto;
                sumaTotal += cantidad * precioUnitario;
            }
        }
        setTotal(sumaTotal);
    }

    //
    async function AgregarProductoCarito(productoId, nombre, precioUnitario) {
        const response = await ProductoService.findById(productoId);
        console.log(response.data.stock)
        if (response.data.stock > 0 ) {
            const precio = parseFloat(precioUnitario);
            const nuevoProducto = {
                productoID: productoId,
                nombre: nombre,
                cantidad: 1,
                precioUnitario: precio
            };

            setCarrito(prevCarrito => {
                const nuevoCarrito = [...prevCarrito, nuevoProducto];
                CalculoTotal(nuevoCarrito);
                return nuevoCarrito;
            });
        } else {
            alert("No hay stock suficiente");
        }
    }

    async function RealizarVenta() {
        try {
            //Venta
            const ventaData = {
                total: total,
                fechaVenta: new Date().toISOString().split('T')[0],
                cajero: cajeroSeleccionado
            };
            console.log(ventaData)
            const responseVenta = await ventaService.create(ventaData);
            const ventaId = responseVenta.data.ventaId;
            console.log(ventaId);
            //DetallesVenta
            for (const productoR of carrito) {

                let productoF = {}
                const responseProducto = await ProductoService.findById(productoR.productoID).then((response) => {
                    productoF = response.data
                    productoSeleccionado.productoId = productoF.productoId
                    productoSeleccionado.nombreProducto = productoF.nombre
                    productoSeleccionado.tipoCerveza = productoF.tipoCerveza
                    productoSeleccionado.descripcion = productoF.descripcion
                    productoSeleccionado.precio = productoF.precio
                    productoSeleccionado.stockP = productoF.stock
                    console.log(productoSeleccionado)
                }).catch((error) => {
                    console.log(error);
                })
                let ventaF = {}
                const responseVenta = await
                    ventaService.findById(ventaId).then((response) => {
                        ventaF = response.data
                        ventaPosicion.ventaId = ventaId
                        ventaPosicion.fechaVenta = ventaF.fechaVenta
                        ventaPosicion.cajero = ventaF.cajero
                        console.log(ventaId)
                    }).catch((error) => {
                        console.log(error);
                    })
                const detalleVenta = {
                    producto: productoSeleccionado,
                    venta: ventaPosicion,
                    cantidad: productoR.cantidad,
                    precioUnitario: productoR.precioUnitario
                };
                console.log(detalleVenta)
                await DetalleVentaService.create(detalleVenta);
                await actualizarStockProducto(productoR.productoID, productoR.cantidad);
            }
            //AutorizacionPago
            const autorizacionPagoData = {
                venta: ventaPosicion,
                monto: total,
                fechaAutorizacion: new Date().toISOString().split('T')[0]
            };
            await AutorizacionPagoService.create(autorizacionPagoData);

            // 4. Limpiar el carrito y reiniciar el total
            setCarrito([]);
            setTotal(0.0);
            alert("La venta se ha realizado correctamente.");
        } catch (error) {
            console.log(error)
            alert("Error al realizar la venta. Por favor, inténtalo nuevamente.");
        }

    }

    async function AumentarCantidadProducto(productoId) {
        try {
            const response = await ProductoService.findById(productoId);
            const productoAux = response.data;
            setStock(productoAux.stock);

            setCarrito(prevCarrito => {
                const nuevoCarrito = prevCarrito.map(producto => {
                    if (producto.productoID === productoId) {
                        if (producto.cantidad < stock) {
                            return {
                                ...producto,
                                cantidad: producto.cantidad + 1
                            };
                        }
                    }
                    return producto;
                });

                CalculoTotal(nuevoCarrito);
                return nuevoCarrito;
            });
        } catch (error) {
            console.log(error);
        }
    }

    function DisminuirCantidadProducto(productoId) {
        setCarrito(prevCarrito => {
            const nuevoCarrito = prevCarrito.map(producto => {
                if (producto.productoID === productoId) {
                    const nuevaCantidad = producto.cantidad - 1;
                    if (nuevaCantidad === 0) {
                        return null;
                    } else {
                        return {
                            ...producto,
                            cantidad: nuevaCantidad
                        };
                    }
                } else {
                    return producto;
                }
            }).filter(producto => producto !== null);
            CalculoTotal(nuevoCarrito);
            return nuevoCarrito;
        });
    }

    const actualizarStockProducto = async (productoId, cantidad) => {
        try {
            const response = await ProductoService.findById(productoId);
            const producto = response.data;
            const stockActualizado = producto.stock - cantidad;
            producto.stock = stockActualizado;
            await ProductoService.update(productoId, producto);
            console.log(producto);
            listaProdutos(); // Update the product list after stock update
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className='container'>
            <div className="form-group mb-2">
                <h2 className='text-center'>Productos</h2>
                <label className='form-label'>Cajeros</label>
                <select
                    type="text"
                    className="form-control"
                    onChange={
                        //se busca el cajero con el Id y se guarda dentro de las variables
                        (e) => {
                            cajeroService.findById(e.target.value).then((response) => {
                                const cajero = response.data;
                                setCajeroId(cajero.cajeroId);
                                setNombre(cajero.nombre);
                                setApePat(cajero.apePat);
                                setApeMat(cajero.apeMat);
                                setSalario(parseFloat(cajero.salario));
                                console.log(cajero);
                            }).catch((error) => {
                                console.log(error);
                            })
                        }}
                    required
                >
                    {cajeros.map(
                        cajero =>
                            <option key={cajero.cajeroId}
                                    value={cajero.cajeroId}>{cajero.nombre + " " + cajero.apePat + " " + cajero.apeMat}</option>
                    )}
                </select>

            </div>
            <table className='table table-dark table-border table-striped '>
                <thead className='text-white text-center' style={{backgroundColor: 'black'}}>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo_Cerveza</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Stock</th>
                <th>Opciones</th>
                </thead>
                <tbody className='text-center'>
                {
                    productos.map(
                        producto =>

                            <tr key={producto.productoId}>
                                <td>{producto.productoId}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.tipoCerveza.nombre}</td>
                                <td>{producto.precio}</td>
                                <th>{producto.descripcion}</th>
                                <th>{producto.stock}</th>
                                <th>
                                    <button className="btn - btn-success"
                                            onClick={() => {
                                                AgregarProductoCarito(producto.productoId, producto.nombre, parseFloat(producto.precio))
                                            }}>
                                        Seleccionar
                                    </button>
                                </th>
                            </tr>
                    )
                }
                </tbody>

            </table>
            <h2 className='text-center'>Carrito</h2>
            <table className='table table-dark table-border table-striped '>
                <thead className='text-white text-center' style={{backgroundColor: 'black'}}>
                <th>ID</th>
                <th>Nombre</th>
                <th>precio_unitario</th>
                <th>Cantidad</th>
                <th>Botones</th>
                </thead>
                <tbody className={'text-center'}>
                {
                    carrito.map(
                        producto =>
                            <tr key={producto.productoID}>
                                <th>{producto.productoID}</th>
                                <th>{producto.nombre}</th>
                                <th>{producto.precioUnitario}</th>
                                <th>{producto.cantidad}</th>
                                <div className='edit-buttons'>
                                    <button type="submit" className="btn btn-danger" onClick={() => {
                                        DisminuirCantidadProducto(producto.productoID)
                                    }}>
                                        -
                                    </button>
                                    <button type="submit" className="btn btn-success" onClick={() => {
                                        AumentarCantidadProducto(producto.productoID)
                                    }}>
                                        +
                                    </button>
                                </div>
                            </tr>
                    )
                }
                </tbody>

            </table>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <h2>Total: ${total}</h2>
                <button className="btn btn-primary" onClick={() => {
                    RealizarVenta()
                }}>Realizar venta
                </button>
            </div>
        </div>
    )
}