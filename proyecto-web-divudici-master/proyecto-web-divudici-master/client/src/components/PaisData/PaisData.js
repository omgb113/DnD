import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePais } from '../../actions/paises';
import { createConsecutivo } from '../../actions/consecutivos';
import { createBitacora } from '../../actions/bitacoras';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './styles.css';
import { Button, Table } from 'react-bootstrap';


const PaisData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch, bitacoraData, generarCodigoBitacora, bitacoraConsecutivoData}) => {

    
    const dispatch = useDispatch();
    const paises = useSelector((state) => state.paises);

    const borrar = (id, codigo) => {

        generarCodigoBitacora();
        dispatch(createConsecutivo(bitacoraConsecutivoData));
        bitacoraData.descripcion =  `Eliminación del país ${codigo}`;
        dispatch(createBitacora(bitacoraData));
        dispatch(deletePais(id));
    }

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Bandera</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {paises.filter( pais => {

                    if(!inputSearchTerm){
                        return pais;

                    }else if( selectedTypeSearch === "codigo"){

                        if(pais.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){

                            console.table(pais);
                            return pais;
                        }
                    }else if( selectedTypeSearch === "nombre"){

                        console.log(pais.descripcion);

                        if(pais.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return pais;
                        }
                    }
                }).map( pais => {
        
                    return(
                        <tr key={pais._id}>
                            <td key={pais.codigo}>{pais.codigo}</td>
                            <td key={pais.nombre}>{pais.nombre}</td>
                            <td key={pais.bandera}><img src={pais.bandera} width="50px" height="30px" alt={`Imagen de la bandera de ${pais.nombre}`}/></td>
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(pais._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => borrar(pais._id, pais.codigo)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default PaisData; 