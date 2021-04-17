import React from 'react';
import { useSelector } from 'react-redux';
import {  Table } from 'react-bootstrap';

const BitacoraData = ({ inputSearchTerm, selectedTypeSearch}) => {

    const bitacoras = useSelector((state) => state.bitacoras);
    const usuarios = useSelector((state) => state.usuarios);

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código del Registro</th>
                    <th>Usuario</th>
                    <th>Fecha y Hora</th>
                    <th>Descripción</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {bitacoras.filter( bitacora => {

                    if(!inputSearchTerm){
                        return bitacora;

                    }else if( selectedTypeSearch === "general"){

                        if(bitacora.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase()) || bitacora.descripcion.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return bitacora;
                        }
                        
                    }else if( selectedTypeSearch === "usuario"){
                        
                        const selectedUsuarios = usuarios.filter( usuario => {
                            if(usuario.login.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                return usuario;
                            }
                        });

                        if(selectedUsuarios.length > 0){

                            for(let i = 0; i < selectedUsuarios.length; i++){
                                
                                if(bitacora.id_usuario === selectedUsuarios[i]._id){
                                    return bitacora;
                                }

                            }
                        }
                        
                    }
                    
                }).map( bitacora => {
        
                    return(
                        <tr key={bitacora._id}>
                            <td key={bitacora.codigo}>{bitacora.codigo}</td>
                            {usuarios.map( usuario => {
                                if(usuario._id === bitacora.id_usuario){

                                    return(
                                        <td key={bitacora.id_usuario}>{usuario.login}</td>
                                    )
                                }
                            })}
                            <td key={bitacora.fecha}>{bitacora.fecha}</td>
                            <td key={bitacora.descripcion}>{bitacora.descripcion}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default BitacoraData; 