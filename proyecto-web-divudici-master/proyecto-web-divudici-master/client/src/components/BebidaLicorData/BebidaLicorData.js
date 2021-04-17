import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBebida } from '../../actions/bebidas';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './styles.css';
import { Button, Table } from 'react-bootstrap';


const BebidaLicorData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch}) => {

    
    const dispatch = useDispatch();
    const bebidas = useSelector((state) => state.bebidas);
    const restaurantes = useSelector((state) => state.restaurantes);
    const paises = useSelector((state) => state.paises);

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Nacionalidad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {bebidas.filter( bebida => {

                    if(bebida.codigo.includes("L-")){
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
                        }else if( selectedTypeSearch === "nacionalidad"){
    
                            const selectedPaises = paises.filter( pais => {
                                if(pais.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                    return pais;
                                }
                            });
    
                            if(selectedPaises.length > 0){
    
                                for(let i = 0; i < selectedPaises.length; i++){
                                    
                                    if(bebida.id_nacionalidad === selectedPaises[i]._id){
                                        return bebida;
                                    }
    
                                }
                            }
                        }else if( selectedTypeSearch === "nombreRestaurante"){
    
                            const selectedRestaurantes = restaurantes.filter( restaurante => {
                                if(restaurante.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                    return restaurante;
                                }
                            });
    
                            if(selectedRestaurantes.length > 0){
    
                                for(let i = 0; i < selectedRestaurantes.length; i++){
                                    
                                    if(bebida.id_restaurante === selectedRestaurantes[i]._id){

                                        console.log(bebida)
                                        return bebida;
                                    }
    
                                }
                            }
                        }
                    }
                    
                }).map( bebida => {
        
                    return(
                        <tr key={bebida._id}>
                            <td key={bebida.codigo}>{bebida.codigo}</td>
                            <td key={bebida.nombre}>{bebida.nombre}</td>
                            <td key={bebida.cantidad}>{bebida.cantidad}</td>
                            <td key={bebida.precioUnitario}> 
                                {(bebida.precioUnitario) ? `₡${bebida.precioUnitario}(unitario)  ` : null } 
                                {(bebida.precioBotella) ? `  ₡${bebida.precioBotella}(botella)` : null }
                            </td>
                            {paises.map( pais => {
                                if(pais._id === bebida.id_nacionalidad){

                                    return(
                                        <td key={bebida.id_nacionalidad}>{pais.nombre}</td>
                                    )
                                }
                            })}
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

export default BebidaLicorData; 