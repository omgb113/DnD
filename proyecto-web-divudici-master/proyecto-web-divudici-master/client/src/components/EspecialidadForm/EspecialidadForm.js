import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, updateConsecutivo, createConsecutivo } from '../../actions/consecutivos';
import { createEspecialidad, getEspecialidades, updateEspecialidad } from '../../actions/especialidades';
import FileBase from 'react-file-base64';
import { createBitacora } from '../../actions/bitacoras';

const EspecialidadForm = ({currentId, setCurrenteId, isOpen, setshow, bitacoraData, generarCodigoBitacora, bitacoraConsecutivoData}) => {

    const dispatch = useDispatch();
    const restaurantes = useSelector((state) => state.restaurantes);
    const consecutivos = useSelector((state) => state.consecutivos);
    const especialidad = useSelector((state) => currentId ? state.especialidades.find((b) => b._id === currentId) : null);
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Especiales', 
        descripcion: 'Especialidad creada automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const [especialidadData, setEspecialidadData] = useState({
        id_consecutivo: '',
        codigo: '',
        nombre: '', 
        ingredientes: [],
        precio: '',
        detalle: '',
        foto: '',
        nombreError: '', 
        ingredientesError: '',
        precioError: '',
        detalleError: '',
        fotoError: ''

    });


    const validate = () => {

        let nombreError = '';
        let ingredientesError = '';
        let precioError = '';
        let detalleError = '';
        let fotoError = '';

        if(!especialidadData.nombre){
            nombreError = 'Debe ingresar el nombre de la especialidad';
        }

        if(especialidadData.ingredientes.length < 1){
            ingredientesError = 'Debe ingresar los ingredientes de la especialidad';
        }

        if(!especialidadData.precio){
            precioError = 'Debe ingresar el precio de la especialidad';
        }else if(especialidadData.precio < 1){
            precioError = 'Números deben ser mayor a 0';
        }

        if(!especialidadData.detalle){
            detalleError = 'Debe ingresar el detalle de la especialidad';
        }

        if(!especialidadData.foto){
            fotoError = 'Debe subir una foto de la especialidad';
        }

    
        if(nombreError || detalleError || ingredientesError || precioError || fotoError){
            setEspecialidadData({ ...especialidadData, nombreError, detalleError, ingredientesError, precioError, fotoError});
            return false;
        }
        
        return true;
    }

    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'ESP-';

        consecutivos.forEach(consecutivo => {

            if(consecutivo.prefijo === prefix){

                if(consecutivo.valor > valorMayor){

                    valorMayor = consecutivo.valor;
                }
                codigoEncontrado = true;
            }
        });

        valorMayor++;

        if(!codigoEncontrado){
            consecutivoData.valor= 1;
            consecutivoData.prefijo = prefix;
            
            codigo = prefix;
        }else{

            codigo = prefix + valorMayor;

            consecutivoData.valor= valorMayor++;
            consecutivoData.prefijo = prefix;
        }

        especialidadData.codigo = codigo;

        return codigo;
    }

    const getConsecutivoId = () => {
        consecutivos.forEach(consecutivo => {
            if(consecutivo.prefijo === consecutivoData.prefijo && consecutivo.valor === consecutivoData.valor){
                return consecutivo._id;
            }
        });
    }

    //populate data on edit
    useEffect(() => { if(especialidad){setEspecialidadData(especialidad)} }, [especialidad]);
    

    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                generarCodigoBitacora();
                dispatch(createConsecutivo(bitacoraConsecutivoData));
                bitacoraData.descripcion =  `Edición de la especialidad ${especialidadData.codigo}`;
                dispatch(createBitacora(bitacoraData));
                dispatch(updateEspecialidad(currentId, especialidadData));
                setCurrenteId(null);
                dispatch(getEspecialidades());
                clearForm();
                setshow(false);
            }else{
                generarCodigoBitacora();
                dispatch(createConsecutivo(bitacoraConsecutivoData));
                bitacoraData.descripcion =  `Creación de la especialidad ${especialidadData.codigo}`;
                dispatch(createBitacora(bitacoraData));
                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setEspecialidadData({ ...especialidadData, id_consecutivo : tempIdConsecutivo});
                dispatch(createEspecialidad(especialidadData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        setCurrenteId(null);
        setEspecialidadData({
            nombre: '', 
            ingredientes: '',
            precioUnitario: '',
            id_restaurante: '', 
            detalle: '',
            foto: '',
            nombreError: '', 
            ingredientesError: '',
            precioUnitarioError: '',
            id_restauranteError: '', 
            detalleError: '',
            fotoError: ''       
        });
    }
    
    
    return(

        <Modal size="lg" show={isOpen} onHide={setshow} onExit={clearForm} className="modal" >
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Especialidad' : 'Crear Especialidad'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody modal-lg">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="6">
                            <Row>
                                <Col md="3"className="text-right pt-1">
                                    <Form.Label >Código</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl type="text" disabled name="codigo" value={!currentId ? generarCodigo() : especialidadData.codigo}></FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Nombre</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (especialidadData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={especialidadData.nombre} onChange={(e) => setEspecialidadData({ ...especialidadData, nombre: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{especialidadData.nombreError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                        

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Ingredientes</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl as="textarea" className={ (especialidadData.ingredientesError) ? 'is-invalid' : ''} type="text" name="detalle" value={especialidadData.ingredientes} onChange={(e) => setEspecialidadData({ ...especialidadData, ingredientes: e.target.value.split(",")})} placeholder="Separar ingredientes usando una coma"></FormControl>
                                        <small className="form-text text-danger">{especialidadData.ingredientesError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Precio</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (especialidadData.precioError) ? 'is-invalid' : ''} type="number" name="precio" value={especialidadData.precio} onChange={(e) => setEspecialidadData({ ...especialidadData, precio: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{especialidadData.precioError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Detalle</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl as="textarea" className={ (especialidadData.detalleError) ? 'is-invalid' : ''} type="text" name="detalle" value={especialidadData.detalle} onChange={(e) => setEspecialidadData({ ...especialidadData, detalle: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{especialidadData.detalleError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                        </Col>

                        <Col md="6">
                            

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Foto</Form.Label>
                                </Col>
                                <Col md="9">
                                    <FormGroup>
                                        <FileBase className={ (especialidadData.fotoError) ? 'is-invalid' : ''} type="file" multiple={false} name="foto" value={especialidadData.foto} onDone={({base64}) => setEspecialidadData({ ...especialidadData, foto: base64})}></FileBase>
                                        <small className="form-text text-danger">{especialidadData.fotoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <img className="img-fluid pr-5 pl-5" src={especialidadData.foto}/>
                                    </FormGroup>
                                </Col>
                            </Row>
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

export default EspecialidadForm;