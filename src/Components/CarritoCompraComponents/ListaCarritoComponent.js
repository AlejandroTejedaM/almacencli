import React, {useEffect, useState} from "react";
import productoService from "../../Services/ProductoService";
import cajeroService from "../../Services/CajeroService";
import {Link} from "react-router-dom";

export default function ListaCarritoComponent() {

    const [carrito, setCarrito] = useState([]);

    const [total, setTotal] = useState(0.0);


    //Venta
    const [ventas, setVentas] = useState([]);
    const [] = useState();
    const [] = useState();
    const [] = useState();
    const [] = useState();
    const [] = useState();
    const ventaNueva = {};

    //Producto
    const [productos, setProductos] = useState([]);
    const [] = useState();
    const productoSeleccionado = {};

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

    //
    function AgregarProductoCarito(productoId, nombre, precioUnitario) {

        const precio = parseFloat(precioUnitario);
        setCarrito([
            ...carrito,
            {
                productoID: productoId,
                nombre: nombre,
                cantidad: 0,
                precioUnitario: precio
            }
        ]);
    }

    function AumentarCantidadProducto(productoId) {
        setCarrito(carrito.map(producto => {
            console.log("holaaaaa" + productoId);
            if (producto.productoID === productoId) {
                return {
                    ...producto,
                    cantidad: producto.cantidad + 1
                };
            } else {
                return producto
            }
        }));
        console.log(carrito);
    }


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
                    {console.log(cajeros)}
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
                                    <button type="submit" className="btn btn-success" onClick={() => {
                                        console.log(producto);
                                        AumentarCantidadProducto(producto.productoID)
                                    }}>
                                        +
                                    </button>
                                    <button type="submit" className="btn btn-danger" onClick={() => {

                                    }}>
                                        -
                                    </button>
                                </div>
                            </tr>
                    )
                }
                </tbody>

            </table>
            <h2>Total: 0</h2>
        </div>
    )
}