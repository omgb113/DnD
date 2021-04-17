import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBebida } from '../../actions/bebidas';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './styles.css';
import { Button, Table } from 'react-bootstrap';


const BebidaGaseosaData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch}) => {

    
    const dispatch = useDispatch();
    const bebidas = useSelector((state) => state.bebidas);
    const restaurantes = useSelector((state) => state.restaurantes);

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {bebidas.filter( bebida => {

                    if(bebida.codigo.includes("BG-")){
                        if(!inputSearchTerm){
                            return bebida;
    
                        }else if( selectedTypeSearch === "codigo"){
    
                            if(bebida.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                return bebida;
                            }
                        }else if( selectedTypeSearch === "nombre"){
    
                            if(bebida.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                return bebida;
                            }
                        }

                    }
                    
                }).map( bebida => {
        
                    return(
                        <tr key={bebida._id}>
                            <td key={bebida.codigo}>{bebida.codigo}</td>
                            <td key={bebida.nombre}>{bebida.nombre}</td>
                            <td key={bebida.precioUnitario}>{bebida.precioUnitario}</td>
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(bebida._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => dispatch(deleteBebida(bebida._id))}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default BebidaGaseosaData; 