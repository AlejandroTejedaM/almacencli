import React, {useEffect, useState} from "react";
import productoService from "../../Services/ProductoService";
import cajeroService from "../../Services/CajeroService";

export default function ListaCarritoComponent() {

    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0.0);
    const [cajeros, setCajeros] = useState([]);


    //Cajero
    const [cajeroId, setCajeroId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apePat, setApePat] = useState('');
    const [apeMat, setApeMat] = useState('');
    const [salario, setSalario] = useState(0.0);

    const cajero = {cajeroId, nombre, apePat, apeMat, salario}

    useEffect(() => {
        listaProdutos();
        listaCajeros();

    }, [])
    useEffect(() => {
        CalculoTotal();
    }, [total])

    useEffect(() => {
    }, [])
    const listaProdutos = () => {
        productoService.findAll().then(response => {
            setProductos(response.data);
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
    const CalculoTotal = () => {
        carrito.forEach((producto) => {
            setTotal(parseFloat(producto.data.precio) * parseInt(producto.data.cantidad));
        })
    }
    //
    const AgregarProductoCarrito = (e) => {
        e.preventDefault();

        //const cajero = {}
        //const producto = {}
        //const venta = {ventaId, total, fechaVenta, cajero}
        //const detalleVenta = {productoId, nombre, cantidad, precio}
        //carrito.push(producto)
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
                                    <button className="btn - btn-success">
                                        Ver
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
                </thead>
                <tbody>
                {
                    carrito.map(
                        producto =>
                            <tr key={producto.productoId}>
                                <th>{producto.productoId}</th>
                                <th>{producto.nombre}</th>
                                <th>{producto.precio_Unitario}</th>
                                <th>{producto.cantida}</th>
                            </tr>
                    )
                }
                </tbody>

            </table>
            <h2>Total: {CalculoTotal()}</h2>
        </div>
    )
}