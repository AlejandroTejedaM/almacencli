import react, { useEffect, useState } from 'react'
import tipoChelaService from '../services/tipoChelaServiceService';
import { Link, useNavigate, useParams } from 'react-router-dom';
export const FormulariotipoChelasComponent = () => {
    const [nombre, setNombre] = useState('');
    const [vendido, setDescripcion] = useState('');
    const navigate = useNavigate();
    const { tipoChelaId } = useParams();

    const saveCervezas = (c) => {
        c.preventDefault();
        const cerveza = { nombre, descripcion};
        const cervezaActualizado = { tipoChelaId, nombre, descripcion };

        if (tipoChelaId) {
            tipoChelaService.update(cerveza, cervezaActualizado)
                .then((response) => {
                    console.log(response.data);
                    navigate('/tipoChelas');
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            tipoChelaService.create(tipoChela)
                .then((response) => {
                    console.log(response.data);
                    navigate('/tipochelas');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };


    useEffect(() => {
        tipoChelaService.findByID(tipoChelaId).then((response) => {

            setNombre(response.data.nombre);
            setDescripcion(response.data.descripcion);
        }).catch(error => {
            console.log(error);
        })
    }, []
    )

    const titulo = () => {
        if (tipoChelaId) {
            return <h2 className='text-center'>Editar tipo de cerveza</h2>
        } else {
            return <h2 className='text-center'>Agregar tipo de cerveza</h2>
        }
    }
    return (
        <div>
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

                                <button className='btn btn-succes' onClick={(c) => saveCervezas(c)}>Guardar</button>
                                &nbsp;&nbsp;
                                <Link to='/tipochelas' className='btn btn-danger'>Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormularioProductoComponent;