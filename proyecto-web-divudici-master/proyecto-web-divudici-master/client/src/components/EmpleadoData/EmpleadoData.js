import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmpleado } from '../../actions/empleados';
import { createConsecutivo } from '../../actions/consecutivos';
import { createBitacora } from '../../actions/bitacoras';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './styles.css';
import { Button, Table } from 'react-bootstrap';


const EmpleadoData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch, bitacoraData, setBitacoraData, generarCodigoBitacora, bitacoraConsecutivoData}) => {

    
    const dispatch = useDispatch();
    const empleados = useSelector((state) => state.empleados);

    const borrar = (id, codigo) => {

        generarCodigoBitacora();
        dispatch(createConsecutivo(bitacoraConsecutivoData));
        bitacoraData.descripcion =  `Eliminación del empleado ${codigo}`;
        dispatch(createBitacora(bitacoraData));
        dispatch(deleteEmpleado(id));
    }

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Cédula</th>
                    <th>Nombre</th>
                    <th>Primer Apellido</th>
                    <th>Segundo Apellido</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {empleados.filter( empleado => {

                    if(!inputSearchTerm){
                        return empleado;

                    }else if( selectedTypeSearch === "codigo"){

                        if(empleado.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return empleado;
                        }
                    }else if( selectedTypeSearch === "nombre"){

                        if(empleado.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return empleado;
                        }
                    }
                    
                }).map( empleado => {
        
                    return(
                        <tr key={empleado._id}>
                            <td key={empleado.codigo}>{empleado.codigo}</td>
                            <td key={empleado.cedula}>{empleado.cedula}</td>
                            <td key={empleado.nombre}>{empleado.nombre}</td>
                            <td key={empleado.primerApellido}>{empleado.primerApellido}</td>
                            <td key={empleado.segundoApellido}>{empleado.segundoApellido}</td>                            
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(empleado._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => borrar(empleado._id, empleado.codigo)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default EmpleadoData; 