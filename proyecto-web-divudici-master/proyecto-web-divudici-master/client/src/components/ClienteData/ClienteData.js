import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCliente } from '../../actions/clientes';
import { createConsecutivo } from '../../actions/consecutivos';
import { createBitacora } from '../../actions/bitacoras';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Table } from 'react-bootstrap';

const ClienteData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch, bitacoraData, setBitacoraData, generarCodigoBitacora, bitacoraConsecutivoData }) => {

    
    const dispatch = useDispatch();
    const clientes = useSelector((state) => state.clientes);
    const restaurantes = useSelector((state) => state.restaurantes);

    const borrar = (id, codigo) => {

        generarCodigoBitacora();
        dispatch(createConsecutivo(bitacoraConsecutivoData));
        bitacoraData.descripcion =  `Eliminación del cliente ${codigo}`;
        dispatch(createBitacora(bitacoraData));
        dispatch(deleteCliente(id));
    }

    return(
    
        <Table className="text-center" striped>

            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Monto</th>
                    <th>Detalle</th>
                    <th>Fecha</th>
                    <th>Reserva</th>
                    <th>Restaurante</th>
                </tr>
            </thead>
            {/* <tbody className="text-white">
                {clientes.filter( cliente => {

                    if(!inputSearchTerm){
                        return cliente;

                    }else if( selectedTypeSearch === "codigo"){

                        if(cliente.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return cliente;
                        }
                    }else if( selectedTypeSearch === "nombre"){

                        if(cliente.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return cliente;
                        }
                    }
                    
                }).map( cliente => {
        
                    return(
                        <tr key={cliente._id}>
                            <td key={cliente.codigo}>{cliente.codigo}</td>
                            <td key={cliente.nombre}>{cliente.nombre}</td>
                            <td key={cliente.montopagado}>{cliente.montopagado}</td>
                            <td key={cliente.detalle}>{cliente.detalle}</td>
                            <td key={cliente.fecha}>{cliente.fecha}</td>                            
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(cliente._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => borrar(cliente._id, cliente.codigo)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody> */}

            
        </Table>
        
    );
}

export default ClienteData; 