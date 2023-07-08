import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import CajeroService from "../../Services/CajeroService";

export default function ListaCajeroComponent() {

    const [cajero, setCajeros] = useState([]);


    useEffect(() => {
        listarCajeros();
    }, [])

    const listarCajeros = () => {
        CajeroService.findAll().then(response => {
            setCajeros(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteCajero = (cajeroId) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este cajero?');
        if (confirmDelete) {
            CajeroService.delete(cajeroId).then((response) => {
                listarCajeros();

            }).catch(error => {
                console.log(error);
            })
        }
    }

    return (
        <div className='container'>
            <h2 className='text-center'>Cajeros Agregados</h2>

            <Link to='/form-cajero' className='btn btn-primary mb-2'>Agregar</Link>

            <table className='table table-striped table-hover'>
                <thead>
                <th>ID</th>
                <th>Apellido Materno</th>
                <th>Apellido Paterno</th>
                <th>Nombre</th>
                <th>Salario</th>
                <th>Acciones</th>
                </thead>
                <tbody>
                {
                    cajero.map(
                        cajero => (
                            <tr key={cajero.cajeroId}>
                                <td>{cajero.cajeroId}</td>
                                <td>{cajero.apeMat}</td>
                                <td>{cajero.apePat}</td>
                                <td>{cajero.nombre}</td>
                                <td>{cajero.salario}</td>
                                <td>
                                    <Link className='btn btn-info' to={`/edit-cajero/${cajero.cajeroId}`}>Editar</Link>
                                    <button style={{marginLeft: '10px'}} className='btn btn-danger'
                                            onClick={() => deleteCajero(cajero.cajeroId)}>Eliminar
                                    </button>
                                </td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
        </div>
    )
}