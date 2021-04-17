import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEspecialidad } from '../../actions/especialidades';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './styles.css';
import { Button, Table } from 'react-bootstrap';
import { createConsecutivo } from '../../actions/consecutivos';
import { createBitacora } from '../../actions/bitacoras';


const EspecialidadData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch, bitacoraData, setBitacoraData, generarCodigoBitacora, bitacoraConsecutivoData}) => {

    
    const dispatch = useDispatch();
    const especialidades = useSelector((state) => state.especialidades);

    const borrar = (id, codigo) => {

        generarCodigoBitacora();
        dispatch(createConsecutivo(bitacoraConsecutivoData));
        bitacoraData.descripcion =  `Eliminación de la especialidad ${codigo}`;
        dispatch(createBitacora(bitacoraData));
        dispatch(deleteEspecialidad(id));
    }
    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Ingredientes</th>
                    <th>Precio</th>
                    <th>Detalle</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {especialidades.filter( especialidad => {

                    if(especialidad.codigo.includes("ESP-")){

                        if(!inputSearchTerm){
                            return especialidad;

                        }else if( selectedTypeSearch === "codigo"){

                            if(especialidad.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                return especialidad;
                            }
                        }else if( selectedTypeSearch === "nombre"){

                            if(especialidad.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                                return especialidad;
                            }
                        }
                    }
                }).map( especialidad => {
        
                    return(
                        <tr key={especialidad._id}>
                            <td key={especialidad.codigo}>{especialidad.codigo}</td>
                            <td key={especialidad.nombre}>{especialidad.nombre}</td>
                            <td>
                                {especialidad.ingredientes.map(ingrediente => {
                                    return ingrediente + " / "
                                })}
                            </td>
                            <td key={especialidad.precio}>{especialidad.precio}</td>
                            <td key={especialidad.detalle}>{especialidad.detalle}</td>
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(especialidad._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => borrar(especialidad._id, especialidad.codigo)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default EspecialidadData; 