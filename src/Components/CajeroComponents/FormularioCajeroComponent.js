import React, {useEffect, useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom";
import CajeroService from "../../Services/CajeroService";

export const FormularioCajeroComponent = () => {

    const [apeMat, setApeMat] = useState('');
    const [apePat, setApePat] = useState('');
    const [nombre, setNombre] = useState('');
    const [salario, setSalario] = useState('');
    const navigate = useNavigate();
    const {cajeroId} = useParams();
    console.log(cajeroId);
    const saveCajero = (e) => {
        e.preventDefault();
        const cajero = {apeMat, apePat, nombre, salario};
        const cajeroActualizado = {cajeroId, apeMat, apePat, nombre, salario};

        if (cajeroId) {
            CajeroService.update(cajeroId, cajeroActualizado).then((response) => {
                console.log(response.data);
                navigate('/cajeros');
            }).catch(error => {
                console.log(error)
            })
        } else {
            CajeroService.create(cajero).then((response) => {
                console.log(response.data);
                navigate('/cajeros');
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        if (cajeroId) {
            CajeroService.findById(cajeroId)
                .then((response) => {
                    setApeMat(response.data.apeMat);
                    setApePat(response.data.apePat);
                    setNombre(response.data.nombre);
                    setSalario(response.data.salario);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [cajeroId]);


    const titulo = () => {
        if (cajeroId) {
            return <h2 className='text-center'>Editar Cajero</h2>
        } else {
            return <h2 className='text-center'>Agregar Cajero</h2>
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
                                    <label className='form-label'>Apellido Paterno</label>
                                    <input
                                        type='text'
                                        placeholder='Ingrese el apellido paterno'
                                        name='apePat'
                                        className='form-control'
                                        value={apePat}
                                        onChange={(e) => setApePat(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Apellido Materno</label>
                                    <input
                                        type='text'
                                        placeholder='Ingrese el apellido materno'
                                        name='apeMat'
                                        className='form-control'
                                        value={apeMat}
                                        onChange={(e) => setApeMat(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Nombre</label>
                                    <input
                                        type='text'
                                        placeholder='Ingrese el nombre'
                                        name='nombre'
                                        className='form-control'
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Salario</label>
                                    <input
                                        type='text'
                                        placeholder='Ingrese el salario'
                                        name='salario'
                                        className='form-control'
                                        value={salario}
                                        onChange={(e) => setSalario(e.target.value)}
                                    />
                                </div>
                                <button className='btn btn-success' onClick={(e) => saveCajero(e)}>Guardar</button>
                                &nbsp;&nbsp;
                                <Link to='/cajeros' className='btn btn-danger'>Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormularioCajeroComponent;