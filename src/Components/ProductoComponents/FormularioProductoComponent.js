import React, {useEffect, useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom";
import cajeroService from "../../Services/CajeroService";
import tipoCervezaService from "../../Services/tipoCervezaService";
import productoService from "../../Services/ProductoService";

export const FormularioProductoComponent = () => {

    const [nombre, setNombre] = useState('');
    const [tipoCerveza, setTipoCerveza] = useState({});
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [stock, setStock] = useState(0);


    const [tipoCervezas, setTipoCervezas] = useState([])
    const navigate = useNavigate();
    const {productoId} = useParams();
    const saveProducto = (e) => {
        e.preventDefault();
        const producto = {nombre, tipoCerveza, precio, descripcion, stock};
        const productoActualizado = {productoId, nombre, tipoCerveza, precio, descripcion, stock};

        if (productoId) {
            productoService.update(productoId, productoActualizado).then((response) => {
                console.log(response.data);
                navigate('/lista-productos');
            }).catch(error => {
                console.log(error)
            })
        } else {
            productoService.create(producto).then((response) => {
                console.log(response.data);
                navigate('/lista-productos');
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        if (productoId) {
            productoService.findById(productoId)
                .then((response) => {
                    setNombre(response.data.nombre);
                    setDescripcion(response.data.descripcion);
                    setStock(response.data.stock);
                    setPrecio(response.data.precio);
                    setTipoCerveza(response.data.tipoCerveza)
                })
                .catch(error => {
                    console.log(error);
                });
        }
        listaTiposCerveza()
    }, [productoId]);
    const listaTiposCerveza = () => {
        tipoCervezaService.findAll().then(response => {
            setTipoCervezas(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
        setTipoCerveza(cajeroService)
    }


    const titulo = () => {
        if (productoId) {
            return <h2 className='text-center'>Editar Producto</h2>
        } else {
            return <h2 className='text-center'>Agregar Producto</h2>
        }
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className='text-center'>
                            {titulo()}
                        </h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Nombre</label>
                                    <input
                                        type='text'
                                        placeholder='Ingrese el apellido paterno'
                                        name='apePat'
                                        className='form-control'
                                        value={nombre}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Tipo Cerveza</label>
                                    <select
                                        type="text"
                                        className="form-control"
                                        onChange={
                                            //se busca el cajero con el Id y se guarda dentro de las variables
                                            (e) => {
                                                tipoCervezaService.findById(e.target.value).then((response) => {
                                                    const tipoCerveza = response.data;
                                                }).catch((error) => {
                                                    console.log(error);
                                                })
                                            }}
                                        required
                                    >
                                        {tipoCervezas.map(
                                            tipoCerveza =>
                                                <option key={tipoCerveza.tipoCervezaId}
                                                        value={tipoCerveza.tipoCervezaId}>{tipoCerveza.nombre}</option>
                                        )}
                                    </select>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Precio</label>
                                    <input
                                        type='text'
                                        placeholder='Ingrese el nombre'
                                        name='nombre'
                                        className='form-control'
                                        value={precio}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Descripción</label>
                                    <input
                                        type='text'
                                        placeholder='Ingrese el salario'
                                        name='salario'
                                        className='form-control'
                                        value={descripcion}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Stock</label>
                                    <input
                                        type='text'
                                        placeholder='Ingrese el salario'
                                        name='salario'
                                        className='form-control'
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>
                                <button className='btn btn-success' onClick={(e) => saveProducto(e)}>Guardar</button>
                                &nbsp;&nbsp;
                                <Link to='/lista-productos' className='btn btn-danger'>Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormularioProductoComponent;