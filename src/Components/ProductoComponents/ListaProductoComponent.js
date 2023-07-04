import React, {useEffect, useState} from "react";
import VentaService from "../../Services/VentaService";
import productoService from "../../Services/ProductoService";

export default function ListaProductoComponent() {

    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        listaProdutos();
    },[])

    const listaProdutos = () => {
        productoService.findAll().then(response => {
            setProductos(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center'>Productos</h2>
            <table className='table table-dark table-border table-striped '>
                <thead className='text-white text-center' style={{backgroundColor: 'black'}}>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo_Cerveza</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Stock</th>
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
                            </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}