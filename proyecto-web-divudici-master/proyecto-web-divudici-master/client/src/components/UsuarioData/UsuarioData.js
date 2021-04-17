import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUsuario } from '../../actions/usuarios';
import { createConsecutivo } from '../../actions/consecutivos';
import { createBitacora } from '../../actions/bitacoras';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Table } from 'react-bootstrap';

const UsuarioData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch, bitacoraData, setBitacoraData, generarCodigoBitacora, bitacoraConsecutivoData }) => {

    
    const dispatch = useDispatch();
    const usuarios = useSelector((state) => state.usuarios);

    const borrar = (id, codigo) => {

        generarCodigoBitacora();
        dispatch(createConsecutivo(bitacoraConsecutivoData));
        bitacoraData.descripcion =  `Eliminación del usuario ${codigo}`;
        dispatch(createBitacora(bitacoraData));
        dispatch(deleteUsuario(id));
    }

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Primer Apellido</th>
                    <th>Segundo Apellido</th>
                    <th>Teléfono Fijo</th>
                    <th>Teléfono Celular</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {usuarios.filter( usuario => {

                    if(!inputSearchTerm){
                        return usuario;

                    }else if( selectedTypeSearch === "codigo"){

                        if(usuario.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){

                            return usuario;
                        }
                    }else if( selectedTypeSearch === "nombre"){

                        if(usuario.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return usuario;
                        }
                    }else if( selectedTypeSearch === "login"){

                        if(usuario.login.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return usuario;
                        }
                    }else if( selectedTypeSearch === "privilegio"){

                        if(usuario.privilegio.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return usuario;
                        }
                    }
                }).map( usuario => {
        
                    return(
                        <tr key={usuario._id}>
                            <td key={usuario.codigo}>{usuario.codigo}</td>
                            <td key={usuario.nombre}>{usuario.nombre}</td>
                            <td key={usuario.primerApellido}>{usuario.primerApellido}</td>
                            <td key={usuario.segundoApellido}>{usuario.segundoApellido}</td>
                            <td key={usuario.telefonoFijo}>{usuario.telefonoFijo}</td>
                            <td key={usuario.telefonoCelular}>{usuario.telefonoCelular}</td>
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(usuario._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => borrar(usuario._id, usuario.codigo)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default UsuarioData; 