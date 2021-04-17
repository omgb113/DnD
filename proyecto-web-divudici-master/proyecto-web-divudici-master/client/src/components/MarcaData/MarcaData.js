import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMarca } from '../../actions/marcas';
import { createConsecutivo } from '../../actions/consecutivos';
import { createBitacora } from '../../actions/bitacoras';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './styles.css';
import { Button, Table } from 'react-bootstrap';


const MarcaData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch, bitacoraData, generarCodigoBitacora, bitacoraConsecutivoData}) => {

    
    const dispatch = useDispatch();
    const marcas = useSelector((state) => state.marcas);
    const paises = useSelector((state) => state.paises);

    const borrar = (id, codigo) => {

        generarCodigoBitacora();
        dispatch(createConsecutivo(bitacoraConsecutivoData));
        bitacoraData.descripcion =  `Eliminación de la marca ${codigo}`;
        dispatch(createBitacora(bitacoraData));
        dispatch(deleteMarca(id));
    }

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Nacionalidad</th>
                    <th>Empresa</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {marcas.filter( marca => {

                    if(!inputSearchTerm){
                        return marca;

                    }else if( selectedTypeSearch === "codigo"){

                        if(marca.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return marca;
                        }
                    }else if( selectedTypeSearch === "nombre"){

                        if(marca.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return marca;
                        }
                    }else if( selectedTypeSearch === "nombreEmpresa"){

                        if(marca.nombreEmpresa.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return marca;
                        }
                    }else if( selectedTypeSearch === "nacionalidad"){

                        const selectedPaises = paises.filter( pais => {
                            if(pais.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                return pais;
                            }
                        });

                        if(selectedPaises.length > 0){

                            for(let i = 0; i < selectedPaises.length; i++){
                                
                                if(marca.id_nacionalidad === selectedPaises[i]._id){
                                    return marca;
                                }

                            }
                        }
                    }
                }).map( marca => {
        
                    return(
                        <tr key={marca._id}>
                            <td key={marca.codigo}>{marca.codigo}</td>
                            <td key={marca.nombre}>{marca.nombre}</td>
                            <td key={marca.descripcion}>{marca.descripcion}</td>

                            {paises.map( pais => {
                                if(pais._id === marca.id_nacionalidad){

                                    return(
                                        <td key={marca.id_nacionalidad}>{pais.nombre}</td>
                                    )
                                }
                            })}
                            
                            <td key={marca.nombreEmpresa}>{marca.nombreEmpresa}</td>
                            <td key={marca.telefono}>{marca.telefono}</td>
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(marca._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => borrar(marca._id, marca.codigo)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default MarcaData; 