import React, {useEffect, useState} from "react"
import {Link, link} from "react-router-dom"
import tipoCervezaService from "../../Services/TipoCervezaService";
import productoService from "../../Services/ProductoService";

export default function ListaTipoCervezaComponent() {

    const [tipoChelas, setTipoChelas] = useState([]);

    useEffect(() => {
        listatipoChelas()
    }, [])

    const listatipoChelas = () => {
        tipoCervezaService.findAll().then(response => {
            setTipoChelas(response.data);
            console.log(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    const deletetipoChela = (tipoCervezaId) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este tipo de cerveza?');
        if (confirmDelete) {
            tipoCervezaService.delete(tipoCervezaId)
                .then((response) => {
                    listatipoChelas();
                    console.log(response.data);
                }).catch(error => {
                console.log(error);
            })
        }
    }
    return (<div className='container'>
        <h2 className="text-center">TIPO DE CERVEZAS</h2>
        <Link to='/form-tipochelas' className="btn btn-primary mb-2">Agregar Tipo de Cerveza</Link>
        <table className="table table-borderd table-striped">
            <thead>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Acciones</th>
            </thead>
            <tbody>
            {tipoChelas.map(chelas => <tr key={chelas.tipoCervezaId}>
                <td>{chelas.tipoCervezaId}</td>
                <td>{chelas.nombre}</td>
                <td>{chelas.descripcion}</td>
                <td>
                    <Link className="btn btn-info"
                          to={`/edit-tipochelas/${chelas.tipoCervezaId}`}>Editar</Link>
                    <button style={{marginLeft: "10px"}} className="btn btn-danger"
                            onClick={() => deletetipoChela(chelas.tipoCervezaId)}>Eliminar
                    </button>
                </td>
            </tr>)}
            </tbody>
        </table>
    </div>)
}