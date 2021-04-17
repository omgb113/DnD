import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, updateConsecutivo, createConsecutivo } from '../../actions/consecutivos';
import { createEmpleado, getEmpleados, updateEmpleado } from '../../actions/empleados';
import FileBase from 'react-file-base64';
import { createBitacora } from '../../actions/bitacoras';


const EmpleadoForm = ({currentId, setCurrenteId, isOpen, setshow, bitacoraData, generarCodigoBitacora, bitacoraConsecutivoData}) => {

    const dispatch = useDispatch();
    const restaurantes = useSelector((state) => state.restaurantes);
    const nacionalidades = useSelector((state) => state.paises);
    const puestos = useSelector((state) => state.puestos);
    const consecutivos = useSelector((state) => state.consecutivos);
    const empleado = useSelector((state) => currentId ? state.empleados.find((b) => b._id === currentId) : null);
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Empleados', 
        descripcion: 'Empleado creado automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const [empleadoData, setEmpleadoData] = useState({
        id_consecutivo: '',
        codigo: '',
        cedula: '',
        nombre: '', 
        primerApellido: '', 
        segundoApellido: '', 
        telefono1: '', 
        telefono2: '', 
        id_puesto: '', 
        id_nacionalidad: '', 
        foto: '',
        id_restaurante: '',
        cedulaError: '',
        nombreError: '', 
        primerApellidoError: '', 
        segundoApellidoError: '', 
        telefono1Error: '', 
        telefono2Error: '', 
        id_puestoError: '', 
        id_nacionalidadError: '', 
        fotoError: '',
        id_restauranteError: ''
    });


    const validate = () => {

        let cedulaError = '';
        let nombreError = '';
        let primerApellidoError = '';
        let segundoApellidoError = '';
        let telefono1Error = '';
        let telefono2Error = '';
        let id_puestoError = '';
        let id_nacionalidadError = '';
        let fotoError = '';
        let id_restauranteError = '';
        
        if(!empleadoData.cedula){
            cedulaError = 'Debe ingresar el número de cédula del empleado';
        }else if(empleadoData.precioUnitario < 1){
            cedulaError = 'Números deben ser mayor a 0';
        }

        if(!empleadoData.nombre){
            nombreError = 'Debe ingresar el nombre del empleado';
        }

        if(!empleadoData.primerApellido){
            primerApellidoError = 'Debe ingresar el primer apellido del empleado';
        }

        if(!empleadoData.segundoApellido){
            segundoApellidoError = 'Debe ingresar el segundo apellido del empleado';
        }

        if(!empleadoData.telefono1){
            telefono1Error = 'Debe ingresar el número de teléfono del empleado';
        }else if(empleadoData.telefono1 < 1){
            telefono1Error = 'Números deben ser mayor a 0';
        }

        if(empleadoData.telefono2){
            if(empleadoData.telefono2 < 1){
                telefono2Error = 'Números deben ser mayor a 0';
            }
        }

        if(!empleadoData.id_puesto){
            id_puestoError = 'Debe seleccionar el puesto del empleado';
        }

        if(!empleadoData.id_nacionalidad){
            id_nacionalidadError = 'Debe seleccionar la nacionalidad del empleado';
        }

        if(!empleadoData.foto){
            fotoError = 'Debe subir una foto de la bebida ';
        }

        if(!empleadoData.id_restaurante){
            id_restauranteError = 'Debe seleccionar el restaurante al que el empleado';
        }

    
        if(cedulaError || nombreError || primerApellidoError || segundoApellidoError || telefono1Error || telefono2Error || id_puestoError || id_nacionalidadError || fotoError || id_restauranteError){
            setEmpleadoData({ ...empleadoData, cedulaError, nombreError, primerApellidoError, segundoApellidoError, telefono1Error, telefono2Error, id_puestoError, id_nacionalidadError, fotoError, id_restauranteError});
            return false;
        }
        
        return true;
    }

    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'EMP-';

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

        empleadoData.codigo = codigo;

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
    useEffect(() => { if(empleado){setEmpleadoData(empleado)} }, [empleado]);
    

    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                generarCodigoBitacora();
                dispatch(createConsecutivo(bitacoraConsecutivoData));
                bitacoraData.descripcion =  `Edición del empleado ${empleadoData.codigo}`;
                dispatch(createBitacora(bitacoraData));
                dispatch(updateEmpleado(currentId, empleadoData));
                setCurrenteId(null);
                dispatch(getEmpleados());
                clearForm();
                setshow(false);
            }else{
                generarCodigoBitacora();
                dispatch(createConsecutivo(bitacoraConsecutivoData));
                bitacoraData.descripcion =  `Creación del empleado ${empleadoData.codigo}`;
                dispatch(createBitacora(bitacoraData));
                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setEmpleadoData({ ...empleadoData, id_consecutivo : tempIdConsecutivo});
                dispatch(createEmpleado(empleadoData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        setCurrenteId(null);
        setEmpleadoData({
            cedula: '',
            nombre: '', 
            primerApellido: '', 
            segundoApellido: '', 
            telefono1: '', 
            telefono2: '', 
            id_puesto: '', 
            id_nacionalidad: '', 
            foto: '',
            id_restaurante: '',
            cedulaError: '',
            nombreError: '', 
            primerApellidoError: '', 
            segundoApellidoError: '', 
            telefono1Error: '', 
            telefono2Error: '', 
            id_puestoError: '', 
            id_nacionalidadError: '', 
            fotoError: '',
            id_restauranteError: ''       
        });
    }
    
    console.table(empleadoData);
    
    return(

        <Modal size="xl" show={isOpen} onHide={setshow} onExit={clearForm} className="modal" >
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Empleado' : 'Crear Empleado'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="6">
                            <Row>
                                <Col md="4"className="text-right pt-1">
                                    <Form.Label >Código</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl type="text" disabled name="codigo" value={!currentId ? generarCodigo() : empleadoData.codigo} ></FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4" className="text-right pt-1">
                                    <Form.Label>Cédula</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (empleadoData.cedulaError) ? 'is-invalid' : ''} type="number" name="cedula" value={empleadoData.cedula} onChange={(e) => setEmpleadoData({ ...empleadoData, cedula: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{empleadoData.cedulaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4" className="text-right pt-1">
                                    <Form.Label>Nombre</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (empleadoData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={empleadoData.nombre} onChange={(e) => setEmpleadoData({ ...empleadoData, nombre: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{empleadoData.nombreError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4" className="text-right pt-1">
                                    <Form.Label>Primer Apellido</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (empleadoData.primerApellidoError) ? 'is-invalid' : ''} type="text" name="primerApellido" value={empleadoData.primerApellido} onChange={(e) => setEmpleadoData({ ...empleadoData, primerApellido: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{empleadoData.primerApellidoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4" className="text-right pt-1">
                                    <Form.Label>Segundo Apellido</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (empleadoData.segundoApellidoError) ? 'is-invalid' : ''} type="text" name="segundoApellido" value={empleadoData.segundoApellido} onChange={(e) => setEmpleadoData({ ...empleadoData, segundoApellido: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{empleadoData.segundoApellidoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="4" className="text-right pt-1">
                                    <Form.Label>Teléfono 1</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (empleadoData.telefono1Error) ? 'is-invalid' : ''} type="number" name="telefono1" value={empleadoData.telefono1} onChange={(e) => setEmpleadoData({ ...empleadoData, telefono1: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{empleadoData.telefono1Error}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="4" className="text-right pt-1">
                                    <Form.Label>Teléfono 2</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (empleadoData.telefono2Error) ? 'is-invalid' : ''} type="number" name="telefono2" value={empleadoData.telefono2} onChange={(e) => setEmpleadoData({ ...empleadoData, telefono2: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{empleadoData.telefono2Error}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="4" className="text-right pt-1">
                                    <Form.Label>Puesto</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_puesto"  className={ (empleadoData.id_puestoError) ? 'is-invalid' : ''} value={empleadoData.id_puesto} onChange={(e) => setEmpleadoData({ ...empleadoData, id_puesto: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {puestos.map((puesto) => <option key={puesto._id} value={puesto._id}>{puesto.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{empleadoData.id_puestoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="4" className="text-right pt-1">
                                    <Form.Label>Nacionalidad</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_nacionalidad"  className={ (empleadoData.id_nacionalidadError) ? 'is-invalid' : ''} value={empleadoData.id_nacionalidad} onChange={(e) => setEmpleadoData({ ...empleadoData, id_nacionalidad: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {nacionalidades.map((nacionalidad) => <option key={nacionalidad._id} value={nacionalidad._id}>{nacionalidad.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{empleadoData.id_nacionalidadError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                        </Col>

                        <Col md="6">

                            <Row>
                                <Col md="4" className="text-right pt-1">
                                    <Form.Label>Foto</Form.Label>
                                </Col>
                                <Col md="8">
                                    <FormGroup>
                                        <FileBase className={ (empleadoData.fotoError) ? 'is-invalid' : ''} type="file" multiple={false} name="foto" value={empleadoData.foto} onDone={({base64}) => setEmpleadoData({ ...empleadoData, foto: base64})}></FileBase>
                                        <small className="form-text text-danger">{empleadoData.fotoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="4" className="text-right pt-1">
                                    
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <img className="img-fluid pr-5 pl-5" src={empleadoData.foto}/>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="4" className="text-right pt-1">
                                    <Form.Label>Restaurante</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_restaurante"  className={ (empleadoData.id_restauranteError) ? 'is-invalid' : ''} value={empleadoData.id_restaurante} onChange={(e) => setEmpleadoData({ ...empleadoData, id_restaurante: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {restaurantes.map((restaurante) => <option key={restaurante._id} value={restaurante._id}>{restaurante.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{empleadoData.id_restauranteError}</small>
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
                            <Button className="mr-4 btn-restaurant" variant="outline-light" type="submit">
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

export default EmpleadoForm;