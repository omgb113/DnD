import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteConsecutivo } from '../../actions/consecutivos';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import { Button, Table } from 'react-bootstrap';


const ConsecutivoData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch}) => {

    
    const dispatch = useDispatch();
    const consecutivos = useSelector((state) => state.consecutivos);
    console.log(consecutivos);
    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th>Valor</th>
                    <th>Contiene Prefijo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {consecutivos.filter( consecutivo => {

                    if(!inputSearchTerm){
                        return consecutivo;

                    }else if( selectedTypeSearch === "descripcion"){

                        if(consecutivo.descripcion.toLowerCase().includes(inputSearchTerm.toLowerCase())){

                            console.table(consecutivo);
                            return consecutivo;
                        }
                    }else if( selectedTypeSearch === "_id"){

                        console.log(consecutivo.descripcion);

                        if(consecutivo._id.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return consecutivo;
                        }
                    }
                }).map( consecutivo => {
        
                    return(
                        <tr key={consecutivo._id}>
                            <td key={consecutivo._id}>{consecutivo._id}</td>
                            <td key={consecutivo.tipo}>{consecutivo.tipo}</td>
                            <td key={consecutivo.descripcion}>{consecutivo.descripcion}</td>
                            <td key={consecutivo.valor}>{consecutivo.valor}</td>
                            <td key={consecutivo.tienePrefijo}>{(consecutivo.tienePrefijo) ? "Sí" : "No"}</td>
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(consecutivo._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => dispatch(deleteConsecutivo(consecutivo._id))}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default ConsecutivoData; 