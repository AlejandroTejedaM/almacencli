import React,{useEffect, useState} from "react"
import tipoChelasService from "../services/tipoChelaService";
import {link} from "react-router-dom"
import tipoChelaService from "../services/tipoChelaService";

export default function listaTipoChelasComponent(){

    conts [tipoChelas, setTipoChelas] = useState([]);

    useEffect(() =>{
        listatipoChelas()
    },[])

    const listatipoChelas = () =>{
        tipoChelasService.findAll().then(response =>{
            setTipoChelas(response.data);
            console.log(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }

    const deletetipoChela = (tipoChelasId) => {
        tipoChelaService.delete(tipoChelasId).then((response) => {
            listatipoChelas();
        }).catch(error => {
            console.log(error);
        })
    }
    return(
        <div className='container'>
            <h2 className="text-center">TIPO DE CERVEZAS</h2>
            <Link to='form-tipochelas' className="btn btn-primary mb-2">Agregar Cerveza</Link>
            <table className="table table-borderd table-striped">
                <thead>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Acciones</th>
                </thead>
                <tbody>
                    {
                       tipochelas.map(
                            chelas =>
                            <tr key={chelas.tipoChelasId}>
                                <td>{chelas.tipoChelasId}</td>
                                <td>{chelas.nombre}</td>
                                <td>{chelas.descripcion}</td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-tipochelas/${tipoChelas.tipoChelasId}`}>Editar</Link>
                                    <button style={{marginLeft:"10px"}} className="btn btn-danger" onClick={() => deletetipoChela(tipoChelas.tipoChelasId)}>Eliminar</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
                }
