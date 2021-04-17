import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMesa } from '../../actions/mesas';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './styles.css';
import { Button, Table } from 'react-bootstrap';


const MesaData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch}) => {

    
    const dispatch = useDispatch();
    const mesas = useSelector((state) => state.mesas);
    const restaurantes = useSelector((state) => state.restaurantes);

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Número</th>
                    <th>Cantidad Sillas</th>
                    <th>Restaurante</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {mesas.filter( mesa => {

                    if(!inputSearchTerm){
                        return mesa;

                    }else if( selectedTypeSearch === "codigo"){

                        if(mesa.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return mesa;
                        }
                    }else if( selectedTypeSearch === "nombre"){

                        if(mesa.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return mesa;
                        }
                    }else if( selectedTypeSearch === "nombreRestaurante"){
    
                        const selectedRestaurantes = restaurantes.filter( restaurante => {
                            if(restaurante.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                return restaurante;
                            }
                        });

                        if(selectedRestaurantes.length > 0){

                            for(let i = 0; i < selectedRestaurantes.length; i++){
                                
                                if(mesa.id_restaurante === selectedRestaurantes[i]._id){

                                    console.log(mesa)
                                    return mesa;
                                }

                            }
                        }
                    }else if( selectedTypeSearch === "sillas"){

                        if(mesa.cantidadSillas.tostring().includes(parseInt(inputSearchTerm))){
                            return mesa;
                        }
                    }
                    
                }).map( mesa => {
        
                    return(
                        <tr key={mesa._id}>
                            <td key={mesa.codigo}>{mesa.codigo}</td>
                            <td key={mesa.nombre}>{mesa.nombre}</td>
                            <td key={mesa.numero}>{mesa.numero}</td>
                            <td key={mesa.cantidadSillas}>{mesa.cantidadSillas}</td>
                            {restaurantes.map( restaurante => {
                                if(restaurante._id === mesa.id_restaurante){

                                    return(
                                        <td key={mesa.id_unidadMedida}>{restaurante.nombre}</td>
                                    )
                                }
                            })}
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(mesa._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => dispatch(deleteMesa(mesa._id))}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default MesaData; 