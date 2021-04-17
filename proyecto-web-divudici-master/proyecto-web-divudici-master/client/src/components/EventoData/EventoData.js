import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEvento } from '../../actions/eventos';
import { createConsecutivo } from '../../actions/consecutivos';
import { createBitacora } from '../../actions/bitacoras';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './styles.css';
import { Button, Table } from 'react-bootstrap';


const EventoData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch, bitacoraData, setBitacoraData, generarCodigoBitacora, bitacoraConsecutivoData}) => {

    
    const dispatch = useDispatch();
    const eventos = useSelector((state) => state.eventos);

    const borrar = (id, codigo) => {

        generarCodigoBitacora();
        dispatch(createConsecutivo(bitacoraConsecutivoData));
        bitacoraData.descripcion =  `Eliminación del evento ${codigo}`;
        dispatch(createBitacora(bitacoraData));
        dispatch(deleteEvento(id));
    }

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {eventos.filter( evento => {

                    if(!inputSearchTerm){
                        return evento;

                    }else if( selectedTypeSearch === "codigo"){

                        if(evento.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return evento;
                        }
                    }else if( selectedTypeSearch === "nombre"){

                        if(evento.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return evento;
                        }
                    }
                }).map( evento => {
        
                    return(
                        <tr key={evento._id}>
                            <td key={evento.codigo}>{evento.codigo}</td>
                            <td key={evento.nombre}>{evento.nombre}</td>
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(evento._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => borrar(evento._id, evento.codigo)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default EventoData; 