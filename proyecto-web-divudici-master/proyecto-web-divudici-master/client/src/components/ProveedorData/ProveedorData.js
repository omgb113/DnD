import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProveedor } from '../../actions/proveedores';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Table } from 'react-bootstrap';

const ProveedorData = ({ setShow, currentId,  setCurrenteId, inputSearchTerm, selectedTypeSearch}) => {

    const dispatch = useDispatch();
    const proveedores = useSelector((state) => state.proveedores);
    const paises = useSelector((state) => state.paises);

    return(
    
        <Table className="text-center" striped>
            <thead>
                <tr>
                    <th className="align-middle">Código</th>
                    <th className="align-middle">Nombre</th>
                    <th className="align-middle">Primer Apellido</th>
                    <th className="align-middle">Segundo Apellido</th>
                    <th className="align-middle">Teléfono Oficina</th>
                    <th className="align-middle">Fax</th>
                    <th className="align-middle">Celular</th>
                    <th className="align-middle">Acciones</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {proveedores.filter( proveedor => {

                    if(!inputSearchTerm){
                        return proveedor;

                    }else if( selectedTypeSearch === "codigo"){

                        if(proveedor.codigo.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return proveedor;
                        }
                    }else if( selectedTypeSearch === "nombre"){

                        if(proveedor.nombre.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return proveedor;
                        }
                    }else if( selectedTypeSearch === "direccion"){

                        if(proveedor.direccion.toLowerCase().includes(inputSearchTerm.toLowerCase())){
                            return proveedor;
                        }
                    }else if( selectedTypeSearch === "cedula"){

                        if(proveedor.cedula.toString().includes(inputSearchTerm)){
                            return proveedor;
                        }
                    }
                }).map( proveedor => {
        
                    return(
                        <tr key={proveedor._id}>
                            <td key={proveedor.codigo}>{proveedor.codigo}</td>
                            <td key={proveedor.nombre}>{proveedor.nombre}</td>
                            <td key={proveedor.primerApellido}>{proveedor.primerApellido}</td>
                            <td key={proveedor.segundoApellido}>{proveedor.segundoApellido}</td>
                            <td key={proveedor.telefonoOficina}>{proveedor.telefonoOficina}</td>
                            <td key={proveedor.telefonoFax}>{proveedor.telefonoFax}</td>
                            <td key={proveedor.telefonoCelular}>{proveedor.telefonoCelular}</td>
                            <td>
                                <Button variant="outline-light" className="btn-action" onClick={() => {setCurrenteId(proveedor._id); setShow(true)}} ><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                                <Button variant="outline-light" className="btn-action" onClick={() => dispatch(deleteProveedor(proveedor._id))}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    );
}

export default ProveedorData; 