import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteRestaurante } from '../../actions/restaurantes';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import { Button, Table } from 'react-bootstrap';


const RestauranteData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch}) => {

    
    const dispatch = useDispatch();
    const restaurantes = useSelector((state) => state.restaurantes);

    console.log(restaurantes);

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Cantidad de Clientes</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {restaurantes.filter( restaurante => {

                    if(!inputSearchTerm){
                        return restaurante;

                    }else if( selectedTypeSearch === "codigo"){

                        if(restaurante.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){

                            console.table(restaurante);
                            return restaurante;
                        }
                    }else if( selectedTypeSearch === "nombre"){

                        console.log(restaurante.descripcion);

                        if(restaurante.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return restaurante;
                        }
                    }
                }).map( restaurante => {
        
                    return(
                        <tr key={restaurante._id}>
                            <td key={restaurante.codigo}>{restaurante.codigo}</td>
                            <td key={restaurante.nombre}>{restaurante.nombre}</td>
                            <td key={restaurante.direccion}>{restaurante.direccion}</td>
                            <td key="2">2</td>
                            <td key={restaurante.telefono}>{restaurante.telefono}</td>
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(restaurante._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => dispatch(deleteRestaurante(restaurante._id))}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default RestauranteData; 