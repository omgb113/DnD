import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePuesto } from '../../actions/puestos';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Table } from 'react-bootstrap';


const PuestoData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch, radioValue}) => {

    
    const dispatch = useDispatch();
    const puestos = useSelector((state) => state.puestos);
    const eventos = useSelector((state) => state.eventos);

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Rol</th>
                    <th>Interno al Restaurante</th>
                    <th>Externo al Restaurante</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {puestos.filter( puesto => {

                    if(radioValue === '1'){

                        if(!inputSearchTerm){
                            return puesto;

                        }else if(puesto.internoRestaurante){

                            if( selectedTypeSearch === "codigo"){

                                if(puesto.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                    return puesto;
                                }
                            }else if( selectedTypeSearch === "nombre"){
    
                                if(puesto.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                    return puesto;
                                }
                            }
                        }
                    }else if (radioValue === '2'){
                        if(!inputSearchTerm){
                            return puesto;

                        }else if(puesto.externoRestaurante){

                            if( selectedTypeSearch === "codigo"){

                                if(puesto.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                    return puesto;
                                }
                            }else if( selectedTypeSearch === "nombre"){
    
                                if(puesto.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                    return puesto;
                                }
                            }
                        }
                    }else{
                        if(!inputSearchTerm){
                            return puesto;

                        }else if( selectedTypeSearch === "codigo"){

                            if(puesto.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                return puesto;
                            }
                        }else if( selectedTypeSearch === "nombre"){

                            if(puesto.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                return puesto;
                            }
                        }
                    }
                }).map( puesto => {
        
                    return(
                        <tr key={puesto._id}>
                            <td key={puesto.codigo}>{puesto.codigo}</td>
                            <td key={puesto.nombre}>{puesto.nombre}</td>
                            {eventos.map( evento => {
                                if(evento._id === puesto.id_evento){

                                    return(
                                        <td key={puesto.id_evento}>{evento.nombre}</td>
                                    )
                                }
                            })}
                            <td key={puesto.internoRestaurante}>{(puesto.internoRestaurante) ? "Sí" : "No"}</td>
                            <td key={puesto.externoRestaurante}>{(puesto.externoRestaurante) ? "Sí" : "No"}</td>
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(puesto._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => dispatch(deletePuesto(puesto._id))}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default PuestoData; 