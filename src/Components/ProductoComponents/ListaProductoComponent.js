import React, {useEffect, useState} from "react";
import productoService from "../../Services/ProductoService";
import {Link} from "react-router-dom";

export default function ListaProductoComponent() {

    const [productos, setProductos] = useState([]);

    const [carrito, setCarrito] = useState([]);
    const [nombre, setNombre] = useState('');
    const [tipoCerveza, setTipoCerveza] = useState({});
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [stock, setStock] = useState(0);


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
    const deleteProducto = (productoId) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
        if (confirmDelete) {
            productoService.delete(productoId)
                .then((response) => {
                    listaProdutos();
                    console.log(response.data);
                }).catch(error => {
                console.log(error);
            })
        }
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
                                    <Link className='btn btn-info' to={`/edit-producto/${producto.productoId}`}>Editar</Link>
                                    <button style={{marginLeft: "10px"}} className='btn btn-danger'
                                            onClick={() => deleteProducto(producto.productoId)}>Eliminar
                                    </button>
                                </th>
                            </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}