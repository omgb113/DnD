import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUnidadMedida } from '../../actions/unidadesMedidas';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import { Button, Table } from 'react-bootstrap';


const UnidadMedidaData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch}) => {

    
    const dispatch = useDispatch();
    const unidadesMedidas = useSelector((state) => state.unidadesMedidas);

    console.log(unidadesMedidas);

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Unidad de Medida</th>
                    <th>Escala</th>
                    <th>Detalle</th>
                    <th>Simbología</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {unidadesMedidas.filter( unidadMedida => {

                    if(!inputSearchTerm){
                        return unidadMedida;

                    }else if( selectedTypeSearch === "codigo"){

                        if(unidadMedida.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){

                            return unidadMedida;
                        }
                    }else if( selectedTypeSearch === "detalle"){

                        console.log(unidadMedida);

                        if(unidadMedida.detalle.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return unidadMedida;
                        }
                    }
                }).map( unidadMedida => {
        
                    return(
                        <tr key={unidadMedida._id}>
                            <td key={unidadMedida.codigo}>{unidadMedida.codigo}</td>
                            <td key={unidadMedida.unidad}>{unidadMedida.unidad}</td>
                            <td key={unidadMedida.escala}>{unidadMedida.escala}</td>
                            <td key={unidadMedida.detalle}>{unidadMedida.detalle}</td>
                            <td key={unidadMedida.simbologia}>{unidadMedida.simbologia}</td>
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(unidadMedida._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => dispatch(deleteUnidadMedida(unidadMedida._id))}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default UnidadMedidaData; 