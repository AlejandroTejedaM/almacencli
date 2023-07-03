import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import AutorizacionPagoService from "../../Services/AutorizacionPagoService";

export default function ListaAutorizacionPagoComponent() {

    const [autorizacionPago, setAutorizacionPago] = useState([]);

    useEffect(() => {
        listaAutorizacionPago();
    }, [])

    const listaAutorizacionPago = () => {
        AutorizacionPagoService.findAll().then(response => {
            setAutorizacionPago(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteAutorizacionPago = (autorizacionId) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta autorización de pago?');
        if (confirmDelete) {
            AutorizacionPagoService.delete(autorizacionId)
                .then((response) => {
                    listaAutorizacionPago();
                    console.log(response.data);
                }).catch(error => {
                console.log(error);
            })
        }
    }

    return (
        <div className='container'>
            <h2 className='text-center'>Autorizaciones registradas</h2>
            <table className='table table-dark table-border table-striped '>
                <thead className='text-white text-center' style={{backgroundColor: 'black'}}>
                <th>ID</th>
                <th>VentaID</th>
                <th>Monto</th>
                <th>FechaAutorización</th>
                </thead>
                <tbody className='text-center'>
                {
                    autorizacionPago.map(
                        autorizacion =>
                            <tr key={autorizacion.autorizacionId}>
                                <td>{autorizacion.autorizacionId}</td>
                                <td>{autorizacion.venta.ventaId}</td>
                                <td>{autorizacion.monto}</td>
                                <td>{autorizacion.fechaAutorizacion}</td>
                            </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}