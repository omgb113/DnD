import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProducto } from '../../actions/productos';
import { createConsecutivo } from '../../actions/consecutivos';
import { createBitacora } from '../../actions/bitacoras';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './styles.css';
import { Button, Table } from 'react-bootstrap';


const ProductoComestibleData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch, bitacoraData, generarCodigoBitacora, bitacoraConsecutivoData}) => {

    
    const dispatch = useDispatch();
    const productos = useSelector((state) => state.productos);
    const restaurantes = useSelector((state) => state.restaurantes);

    const borrar = (id, codigo) => {

        generarCodigoBitacora();
        dispatch(createConsecutivo(bitacoraConsecutivoData));
        bitacoraData.descripcion =  `Eliminación del producto ${codigo}`;
        dispatch(createBitacora(bitacoraData));
        dispatch(deleteProducto(id));
    }
    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Restaurante</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {productos.filter( producto => {

                    if(producto.codigo.includes("COM-")){

                        if(!inputSearchTerm){
                            return producto;

                        }else if( selectedTypeSearch === "codigo"){

                            if(producto.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                return producto;
                            }
                        }else if( selectedTypeSearch === "nombre"){

                            if(producto.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                return producto;
                            }
                        }else if( selectedTypeSearch === "restaurante"){

                            const selectedRestaurantes = restaurantes.filter( restaurante => {
                                if(restaurante.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                    return restaurante;
                                }
                            });
    
                            if(selectedRestaurantes.length > 0){
    
                                for(let i = 0; i < selectedRestaurantes.length; i++){
                                    
                                    if(producto.id_restaurante === selectedRestaurantes[i]._id){
                                        return producto;
                                    }
    
                                }
                            }
                        }
                    }
                }).map( producto => {
        
                    return(
                        <tr key={producto._id}>
                            <td key={producto.codigo}>{producto.codigo}</td>
                            <td key={producto.nombre}>{producto.nombre}</td>
                            <td key={producto.cantidad}>{producto.cantidad}</td>
                            {restaurantes.map( restaurante => {
                                if(restaurante._id === producto.id_restaurante){

                                    return(
                                        <td key={producto.id_unidadMedida}>{restaurante.nombre}</td>
                                    )
                                }
                            })}
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(producto._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => borrar(producto._id, producto.codigo)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default ProductoComestibleData; 