import {Link, useNavigate, useParams} from 'react-router-dom';
import tipoCervezaService from "../../Services/TipoCervezaService";
import {useEffect, useState} from "react";

export const FormulariotipoChelasComponent = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const navigate = useNavigate();
    const {tipoCervezaId} = useParams();

    const saveCervezas = (c) => {
        c.preventDefault();
        const tipoCerveza = {nombre, descripcion};
        const tipoCervezaActualizado = {tipoCervezaId, nombre, descripcion};

        if (tipoCervezaId) {
            tipoCervezaService.update(tipoCervezaId, tipoCerveza)
                .then((response) => {
                    console.log(response.data);
                    navigate('/tipoCerveza');
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            tipoCervezaService.create(tipoCerveza)
                .then((response) => {
                    console.log(response.data);
                    navigate('/tipoCerveza');
                })
                .catch(error => {
                    console.log(error);
                    console.log(tipoCerveza);
                });
        }
    };


    useEffect(() => {
        tipoCervezaService.findById(tipoCervezaId).then((response) => {
            setNombre(response.data.nombre);
            setDescripcion(response.data.descripcion);
        }).catch(error => {
            console.log(error);
        })
    }, [tipoCervezaId])

    const titulo = () => {
        if (tipoCervezaId) {
            return <h2 className='text-center'>Editar tipo de cerveza</h2>
        } else {
            return <h2 className='text-center'>Agregar tipo de cerveza</h2>
        }
    }
    return (<div>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'> {titulo()}</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Nombre</label>
                                <input
                                    type='text'
                                    placeholder='Ingrese el Nombre'
                                    name="nombre"
                                    className="form-control"
                                    value={nombre}
                                    onChange={(c) => setNombre(c.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label2'>Descripcion</label>
                                <input
                                    type='text'
                                    placeholder='Ingrese la descripcion'
                                    name="descripcion"
                                    className="form-control"
                                    value={descripcion}
                                    onChange={(c) => setDescripcion(c.target.value)}
                                />
                            </div>

                            <button className='btn btn-success' onClick={(c) => saveCervezas(c)}>Guardar</button>
                            &nbsp;&nbsp;
                            <Link to='/tipoCerveza' className='btn btn-danger'>Cancelar</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default FormulariotipoChelasComponent;