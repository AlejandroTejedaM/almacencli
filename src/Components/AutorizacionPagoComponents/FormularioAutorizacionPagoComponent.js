import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import AutorizacionPagoService from "../../Services/AutorizacionPagoService";

const FormularioAutorizacionPagoComponent = () => {

    const [fechaVenta, setFechaVenta] = useState('');
    const [total, setTotal] = useState(0.0);

    const {idAuto} = useParams();

    useEffect(() => {
        if (idAuto) {
            AutorizacionPagoService.findById(idAuto)
                .then((response) => {
                    const vehiculo = response.data;
                    setFechaVenta(vehiculo.marca);
                    setTotal(vehiculo.vendido);
                    setPrecio(vehiculo.precio);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [idAuto]);

    const saveAuto = (e) => {
        e.preventDefault();
        const auto = { marca: fechaVenta, vendido: total, precio};
        const autoActualizado = {autorizacionId: idAuto, marca: fechaVenta, vendido: total, precio};

        if (idAuto) {
            AutorizacionPagoService.update(idAuto, autoActualizado).then((response) => {
                console.log(response.data);
                navigate('/autos');
            }).catch(error => {
                console.log(error);
            })
        } else {
            AutorizacionPagoService.create(auto).then((response) => {
                console.log(response.data);
                navigate('/autos');
            }).catch(error => {
                console.log(error);
            })
        }
    }
    const titulo = () => {
        if (idAuto) {
            return <h2 className='text-center'>Editar Auto</h2>;
        } else {
            return <h2 className='text-center'>Agregar Auto</h2>;
        }
    }
    const modeloHandlerText = () => {
        if (idAuto) {
            return (
                <div className="form-group mb-2">
                    <label className='form-label'>Modelo</label>
                    <input
                        type="text"
                        className="form-control"
                        name={modelo}
                        value={modelo}
                        onChange={(e) => {
                            setModelo(e.target.value)
                        }}
                        required
                    />
                </div>
            );
        } else {
            return (
                <div className="form-group mb-2">
                    <label className='form-label'>Modelo</label>
                    <input
                        type="text"
                        className="form-control"
                        name={modelo}
                        placeholder='Ingrese el modelo'
                        onChange={(e) => {
                            setModelo(e.target.value)
                        }}
                        required
                    />
                </div>
            );
        }
    }
    const marcaHandlerText = () => {
        if (idAuto) {
            return (
                <div className="form-group">
                    <label>Marca</label>
                    <input
                        type="text"
                        className="form-control"
                        value={fechaVenta}
                        name={fechaVenta}
                        onChange={(e) => {
                            setFechaVenta(e.target.value)
                        }} required
                    />
                </div>
            );
        } else {
            return (
                <div className="form-group">
                    <label>Marca</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder='Ingrese la marca'
                        name={fechaVenta}
                        onChange={(e) => {
                            setFechaVenta(e.target.value)
                        }} required
                    />
                </div>
            );
        }
    }
    const vendidoHandlerOption = () => {
        if (idAuto) {
            return (
                <div className="form-group">
                    <label>Vendido</label>
                    <select
                        className="form-control"
                        name="vendido"
                        value={total ? 'true' : 'false'}
                        onChange={(e) => setTotal(e.target.value === 'true')}
                        required
                    >
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                    </select>
                </div>
            );
        } else {
            return (
                <div className="form-group">
                    <label>Vendido</label>
                    <select
                        className="form-control"
                        name="vendido"
                        onChange={(e) => setTotal(e.target.value === 'true')}
                        required
                    >
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                    </select>
                </div>
            );
        }
    }
    const precioHandlerText = () => {
        if (idAuto) {
            return (
                <div className="form-group">
                    <label>Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        value={precio}
                        name={precio}
                        onChange={(e) => {
                            setPrecio(parseFloat(e.target.value))
                        }}
                    />
                </div>
            );
        } else {
            return (
                <div className="form-group">
                    <label>Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder='Ingrese el precio'
                        name={precio}
                        onChange={(e) => {
                            setPrecio(parseFloat(e.target.value))
                        }}
                    />
                </div>
            );
        }
    };

    const navigate = useNavigate();

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className='text-center'>{titulo()}</h2>
                        <div className='card-body'>
                            <form>
                                <div className='label-modelo'>{modeloHandlerText()}</div>
                                <div className='label-marca'>{marcaHandlerText()}</div>
                                <div className='label-vendido'>{vendidoHandlerOption()}</div>
                                <div className='label-precio'>{precioHandlerText()}</div>
                                <div className='edit-buttons'>
                                    <button type="submit" className="btn btn-success"
                                            onClick={(e) => saveAuto(e)}>Guardar
                                    </button>
                                    <Link to='/autos' className='btn btn-danger'>Cancelar</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FormularioAutorizacionPagoComponent;