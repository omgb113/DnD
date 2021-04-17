import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { createConsecutivo, getConsecutivos, updateConsecutivo } from '../../actions/consecutivos';


const ConsecutivoForm = ({currentId, setCurrenteId, isOpen, setshow, onExit}) => {

    const consecutivo = useSelector((state) => currentId ? state.consecutivos.find((c) => c._id === currentId) : null);
    const [checked, setChecked] = useState(true);
    const dispatch = useDispatch();
    const [consecutivoData, setConsecutivoData] = useState({
        tipo: '', 
        descripcion: '', 
        valor: '', 
        tienePrefijo: checked, 
        prefijo: '', 
        tipoError: '', 
        descripcionError: '', 
        valorError: '', 
        prefijoError: ''
    
    });

    const validate = () => {

        let tipoError = '';
        let descripcionError = ''; 
        let valorError = '';
        let prefijoError =  '';

        console.log("Tipo consecutivo: " + consecutivoData.tipo);

        if(!consecutivoData.tipo){
            tipoError = 'Seleccione el tipo de consecutivo';
        }

        if(!consecutivoData.descripcion){
            descripcionError = 'Debe ingresar una descripción';
        }

        if(!consecutivoData.valor){
            valorError = 'Debe ingresar un valor';
        }
        if(consecutivoData.valor < 0){
            valorError = 'No se permiten números negativos';
        }

        console.log("Checked: " + checked)

        if(checked && !consecutivoData.prefijo){
            prefijoError = 'Debe ingresar un prefijo';
        }

        if(tipoError || descripcionError ||  valorError || prefijoError){
            setConsecutivoData({ ...consecutivoData, tipoError, descripcionError , valorError, prefijoError });
            return false;
        }

        
        return true;

    }

    //populate data on edit
    useEffect(() => {
        if(consecutivo){
            setConsecutivoData(consecutivo);
            setChecked(consecutivo.tienePrefijo);
        } 
    }, [consecutivo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updateConsecutivo(currentId, consecutivoData));
                setCurrenteId(null);
                dispatch(getConsecutivos());
                clearForm();
                setshow(false);
    
            }else{

                dispatch(createConsecutivo(consecutivoData));
                clearForm();
                dispatch(getConsecutivos());
                setshow(false);
            }
        }

    }
        

    const clearForm = () => {
        setCurrenteId(null);
        setConsecutivoData({tipo: '', descripcion: '', valor: '', tienePrefijo: '', prefijo: ''});
    }
    
    return(

        <Modal show={isOpen} onHide={setshow} onExit={clearForm} className="modal">
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Consecutivo' : 'Información de Consecutivos'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="3"className="text-right pt-1">
                            <Form.Label >Tipo</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Form.Control as="select" className={(consecutivoData.tipoError) ? 'is-invalid' : ''} name="tipo" value={consecutivoData.tipo} onChange={(e) => setConsecutivoData({ ...consecutivoData, tipo: e.target.value})}>
                                    <option value="">--Seleccione--</option>
                                    <option value="Clientes">Clientes</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Proveedores">Proveedores</option>
                                    <option value="Puestos">Puestos</option>
                                    <option value="Eventos o Roles">Eventos o Roles</option>
                                    <option value="Usuarios">Usuarios</option>
                                    <option value="Proveedores">Proveedores</option>
                                    <option value="Unidades de Medida">Unidades de Medida</option>
                                    <option value="Paises">Países</option>
                                    <option value="Marcas">Marcas</option>
                                    <option value="Comestibles">Comestibles</option>
                                    <option value="Desechables y Empaques">Desechables y Empaques</option>
                                    <option value="Equipos y Utensilios">Equipos y Utensilios</option>
                                    <option value="Limpieza e Higiene">Limpieza e Higiene</option>
                                    <option value="Tecnologia">Tecnología</option>
                                    <option value="Restaurantes">Restaurantes</option>
                                    <option value="Buffet">Buffet</option>
                                    <option value="Especiales">Especiales</option>
                                    <option value="Bebidas Calientes">Bebidas Calientes</option>
                                    <option value="Bebidas Heladas">Bebidas Heladas</option>
                                    <option value="Bebidas Gaseosas">Bebidas Gaseosas</option>
                                    <option value="Licores">Licores</option>
                                    <option value="Vinos">Vinos</option>
                                    <option value="Empleados">Empleados</option>
                                    <option value="Mesas">Mesas</option>
                                    <option value="Bitacora">Bitácora</option>
                                    <option value="Facturas">Facturas</option>
                                    
                                </Form.Control>
                                <small className="form-text text-danger">{consecutivoData.tipoError}</small>
                            </FormGroup>
                            
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Descripción</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (consecutivoData.descripcionError) ? 'is-invalid' : ''} type="text" name="descripcion" value={consecutivoData.descripcion} onChange={(e) => setConsecutivoData({ ...consecutivoData, descripcion: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{consecutivoData.descripcionError}</small>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Valor</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (consecutivoData.valorError) ? 'is-invalid' : ''} type="number" name="valor" value={consecutivoData.valor} onChange={(e) => setConsecutivoData({ ...consecutivoData, valor: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{consecutivoData.valorError}</small>
                            </FormGroup>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3">
            
                        </Col>
                        <Col>
                            <FormGroup>
                                <Form.Check type="checkbox" label="El consecutivo posee prefijo" name="tienePrefijo" defaultChecked={checked} onChange={(e) => {setConsecutivoData({ ...consecutivoData, tienePrefijo: e.target.checked});  setChecked(!checked); }}/>
                            </FormGroup>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Prefijo</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={(consecutivoData.prefijoError) ? 'is-invalid' : ''} type="text" id="prefijoTxt" name="prefijo" disabled={!checked} value={consecutivoData.prefijo} onChange={(e) => setConsecutivoData({ ...consecutivoData, prefijo: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{consecutivoData.prefijoError}</small>
                            </FormGroup>
                            
                        </Col>
                    </Row>
                    <Row className="float-right">
                        <Col>
                            <Button className="mr-2 btn-restaurant" variant="outline-light" onClick={ clearForm } >
                                <FontAwesomeIcon icon={faEraser} size="2x"></FontAwesomeIcon>
                            </Button>
                            <Button className="mr-3 btn-restaurant" variant="outline-light" type="submit">
                                <FontAwesomeIcon icon={faSave} size="2x"></FontAwesomeIcon>
                            </Button>
                        </Col>
                        
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="mfooter"> </Modal.Footer>

        </Modal>
    );
};

export default ConsecutivoForm;