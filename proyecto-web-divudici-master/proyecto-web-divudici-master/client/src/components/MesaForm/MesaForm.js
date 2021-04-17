import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, updateConsecutivo, createConsecutivo } from '../../actions/consecutivos';
import { createMesa, getMesas, updateMesa } from '../../actions/mesas';



const MesaForm = ({currentId, setCurrenteId, isOpen, setshow, currentConsecutivo, setCurrentConsecutivo, selectedConsecutivo}) => {

    const dispatch = useDispatch();
    const restaurantes = useSelector((state) => state.restaurantes);
    const mesas = useSelector((state) => state.mesas);
    const mesa = useSelector((state) => currentId ? state.mesas.find((b) => b._id === currentId) : null);
    const consecutivos = useSelector((state) => state.consecutivos);
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Mesas', 
        descripcion: 'Mesa creada automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const [mesaData, setMesaData] = useState({
        id_consecutivo: '',
        codigo: '',
        nombre: '', 
        numero: '',
        cantidadSillas: '',
        id_restaurante: '', 
        nombreError: '', 
        numeroError: '',
        cantidadSillasError: '',
        id_restauranteError: ''
    });


    const validate = () => {

        let nombreError = '';
        let numeroError = '';
        let cantidadSillasError = '';
        let id_restauranteError = '';

        if(!mesaData.nombre){
            nombreError = 'Debe ingresar el nombre de la mesa';
        }else if(verificarNombreMesa()){
            nombreError = 'Nombre de la mesa ya existe';
        }

        if(!mesaData.numero){
            numeroError = 'Debe ingresar el número  de la mesa';
        }else if(mesaData.numero < 1){
            numeroError = 'Números deben ser mayor a 0';
        }

        if(!mesaData.cantidadSillas){
            cantidadSillasError = 'Debe ingresar la cantidad de sillas de la mesa';
        }else if(mesaData.cantidadSillas < 1){
            cantidadSillasError = 'Números deben ser mayor a 0';
        }

        if(!mesaData.id_restaurante){
            id_restauranteError = 'Debe seleccionar el restaurante de la bebida';
        }

    
        if(nombreError || numeroError || cantidadSillasError || id_restauranteError ){
            setMesaData({ ...mesaData, nombreError, numeroError, cantidadSillasError, id_restauranteError});
            return false;
        }
        
        return true;
    }

    const verificarNombreMesa = () => {

        let nombreExiste = false;

        mesas.forEach(mesa => {

            if(currentId !== mesa._id){
            
                if(mesa.nombre.toLowerCase().trim() === mesaData.nombre.toLowerCase().trim()){
                    nombreExiste = true;
                }
            }
        });

        return nombreExiste;
    }

    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'ME-';

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

        mesaData.codigo = codigo;

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
    useEffect(() => { if(mesa){setMesaData(mesa)} }, [mesa]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updateMesa(currentId, mesaData));
                setCurrenteId(null);
                dispatch(getMesas());
                clearForm();
                setshow(false);
            }else{

                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setMesaData({ ...mesaData, id_consecutivo : tempIdConsecutivo});
                dispatch(createMesa(mesaData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        setCurrenteId(null);
        setMesaData({
            nombre: '', 
            ingredientes: '',
            precioUnitario: '',
            id_restaurante: '', 
            descripcion: '',
            foto: '',
            nombreError: '', 
            ingredientesError: '',
            precioUnitarioError: '',
            id_restauranteError: '', 
            descripcionError: '',
            fotoError: ''       
        });
    }
    
    
    return(

        <Modal size="m" show={isOpen} onHide={setshow} onExit={clearForm} className="modal" >
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Mesa' : 'Crear Mesa'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody modal-lg">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                        <Row>
                            <Col md="3"className="text-right pt-1">
                                <Form.Label >Código</Form.Label>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <FormControl type="text" disabled name="codigo" value={!currentId ? generarCodigo() : mesaData.codigo}></FormControl>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3" className="text-right pt-1">
                                <Form.Label>Nombre</Form.Label>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <FormControl className={ (mesaData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={mesaData.nombre} onChange={(e) => setMesaData({ ...mesaData, nombre: e.target.value})}></FormControl>
                                    <small className="form-text text-danger">{mesaData.nombreError}</small>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="3" className="text-right pt-1">
                                <Form.Label>Número</Form.Label>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <FormControl className={ (mesaData.numeroError) ? 'is-invalid' : ''} type="number" name="numero" value={mesaData.numero} onChange={(e) => setMesaData({ ...mesaData, numero: e.target.value})}></FormControl>
                                    <small className="form-text text-danger">{mesaData.numeroError}</small>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="3" className="text-right pt-1">
                                <Form.Label>Cantidad Sillas</Form.Label>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <FormControl className={ (mesaData.cantidadSillasError) ? 'is-invalid' : ''} type="number" name="cantidadSillas" value={mesaData.cantidadSillas} onChange={(e) => setMesaData({ ...mesaData, cantidadSillas: e.target.value})}></FormControl>
                                    <small className="form-text text-danger">{mesaData.cantidadSillasError}</small>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="3" className="text-right pt-1">
                                <Form.Label>Restaurante</Form.Label>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Form.Control as="select" name="id_restaurante"  className={ (mesaData.id_restauranteError) ? 'is-invalid' : ''} value={mesaData.id_restaurante} onChange={(e) => setMesaData({ ...mesaData, id_restaurante: e.target.value})} >
                                        <option value="">--Seleccione--</option>
                                        {restaurantes.map((restaurante) => <option key={restaurante._id} value={restaurante._id}>{restaurante.nombre}</option>)}               
                                    </Form.Control>
                                    <small className="form-text text-danger">{mesaData.id_restauranteError}</small>
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

export default MesaForm;