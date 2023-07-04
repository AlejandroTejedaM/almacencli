import React, {useEffect, useState} from 'react';
import VentaService from "../../Services/VentaService";

export default function ListaVentaComponent() {

    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        listaVentas();
    }, [])

    const listaVentas = () => {
        VentaService.findAll().then(response => {
            setVentas(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteAutorizacionPago = (autorizacionId) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta autorización de pago?');
        if (confirmDelete) {
            VentaService.delete(autorizacionId)
                .then((response) => {
                    listaVentas();
                    console.log(response.data);
                }).catch(error => {
                console.log(error);
            })
        }
    }

    return (
        <div className='container'>
            <h2 className='text-center'>Ventas registradas</h2>
            <table className='table table-dark table-border table-striped '>
                <thead className='text-white text-center' style={{backgroundColor: 'black'}}>
                <th>ID</th>
                <th>Total</th>
                <th>Fecha_Venta</th>
                <th>CajeroId</th>
                <th>Nombre_Cajero</th>
                </thead>
                <tbody className='text-center'>
                {
                    ventas.map(
                        venta =>
                            <tr key={venta.ventaId}>
                                <td>{venta.ventaId}</td>
                                <td>{venta.total}</td>
                                <td>{venta.fechaVenta}</td>
                                <td>{venta.cajero.cajeroId}</td>
                                <th>{venta.cajero.nombre}</th>
                            </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}