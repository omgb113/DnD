import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBebida } from '../../actions/bebidas';
import { createConsecutivo } from '../../actions/consecutivos';
import { createBitacora } from '../../actions/bitacoras';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './styles.css';
import { Button, Table } from 'react-bootstrap';


const BebidaCalienteData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch, bitacoraData, generarCodigoBitacora, bitacoraConsecutivoData}) => {

    
    const dispatch = useDispatch();
    const bebidas = useSelector((state) => state.bebidas);
    const restaurantes = useSelector((state) => state.restaurantes);

    const borrar = (id, codigo) => {

        generarCodigoBitacora();
        dispatch(createConsecutivo(bitacoraConsecutivoData));
        bitacoraData.descripcion =  `Eliminación de la bebida ${codigo}`;
        dispatch(createBitacora(bitacoraData));
        dispatch(deleteBebida(id));
    }

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Restaurante</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {bebidas.filter( bebida => {

                    if(bebida.codigo.includes("BC-")){

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
                            {restaurantes.map( restaurante => {
                                if(restaurante._id === bebida.id_restaurante){

                                    return(
                                        <td key={bebida.id_unidadMedida}>{restaurante.nombre}</td>
                                    )
                                }
                            })}
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(bebida._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => borrar(bebida._id, bebida.codigo)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default BebidaCalienteData; 