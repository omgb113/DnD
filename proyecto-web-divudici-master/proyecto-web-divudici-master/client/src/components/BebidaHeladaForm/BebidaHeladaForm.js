import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, updateConsecutivo, createConsecutivo } from '../../actions/consecutivos';
import { createBebida, getBebidas, updateBebida } from '../../actions/bebidas';
import FileBase from 'react-file-base64';



const BebidaHeladaForm = ({currentId, setCurrenteId, isOpen, setshow, currentConsecutivo, setCurrentConsecutivo, selectedConsecutivo}) => {

    const dispatch = useDispatch();
    const restaurantes = useSelector((state) => state.restaurantes);
    const consecutivos = useSelector((state) => state.consecutivos);
    const bebida = useSelector((state) => currentId ? state.bebidas.find((b) => b._id === currentId) : null);
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Bebidas Heladas', 
        descripcion: 'Bebida Helada creada automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const [bebidaHeladaData, setBebidaHeladaData] = useState({
        id_consecutivo: '',
        codigo: '',
        nombre: '', 
        ingredientes: [],
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


    const validate = () => {

        let nombreError = '';
        let ingredientesError = '';
        let precioUnitarioError = '';
        let id_restauranteError = '';
        let descripcionError = '';
        let fotoError = '';

        if(!bebidaHeladaData.nombre){
            nombreError = 'Debe ingresar el nombre de la bebida';
        }

        if(bebidaHeladaData.ingredientes.length < 1){
            ingredientesError = 'Debe ingresar los ingredientes de la bebida';
        }

        if(!bebidaHeladaData.precioUnitario){
            precioUnitarioError = 'Debe ingresar el precio de la bebida';
        }else if(bebidaHeladaData.precioUnitario < 1){
            precioUnitarioError = 'Números deben ser mayor a 0';
        }

        if(!bebidaHeladaData.id_restaurante){
            id_restauranteError = 'Debe seleccionar el restaurante de la bebida';
        }

        if(!bebidaHeladaData.descripcion){
            descripcionError = 'Debe ingresar la descripción de la bebida';
        }

        if(!bebidaHeladaData.foto){
            fotoError = 'Debe subir una foto de la bebida ';
        }

    
        if(nombreError || descripcionError || ingredientesError || precioUnitarioError || id_restauranteError || fotoError){
            setBebidaHeladaData({ ...bebidaHeladaData, nombreError, descripcionError, ingredientesError, precioUnitarioError, id_restauranteError, fotoError});
            return false;
        }
        
        return true;
    }

    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'BH-';

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

        bebidaHeladaData.codigo = codigo;

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
    useEffect(() => { if(bebida){setBebidaHeladaData(bebida)} }, [bebida]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updateBebida(currentId, bebidaHeladaData));
                setCurrenteId(null);
                dispatch(getBebidas());
                clearForm();
                setshow(false);
            }else{

                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setBebidaHeladaData({ ...bebidaHeladaData, id_consecutivo : tempIdConsecutivo});
                dispatch(createBebida(bebidaHeladaData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        setCurrenteId(null);
        setBebidaHeladaData({
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

        <Modal size="lg" show={isOpen} onHide={setshow} onExit={clearForm} className="modal" >
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Bebida Helada' : 'Crear Bebida Helada'}</Modal.Title>
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
                                        <FormControl type="text" disabled name="codigo" value={!currentId ? generarCodigo() : bebidaHeladaData.codigo}></FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Nombre</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (bebidaHeladaData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={bebidaHeladaData.nombre} onChange={(e) => setBebidaHeladaData({ ...bebidaHeladaData, nombre: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaHeladaData.nombreError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                        

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Ingredientes</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl as="textarea" className={ (bebidaHeladaData.ingredientesError) ? 'is-invalid' : ''} type="text" name="descripcion" value={bebidaHeladaData.ingredientes} onChange={(e) => setBebidaHeladaData({ ...bebidaHeladaData, ingredientes: e.target.value.split(",")})} placeholder="Separar ingredientes usando una coma"></FormControl>
                                        <small className="form-text text-danger">{bebidaHeladaData.ingredientesError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Precio</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (bebidaHeladaData.precioUnitarioError) ? 'is-invalid' : ''} type="number" name="precioUnitario" value={bebidaHeladaData.precioUnitario} onChange={(e) => setBebidaHeladaData({ ...bebidaHeladaData, precioUnitario: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaHeladaData.precioUnitarioError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Restaurante</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_restaurante"  className={ (bebidaHeladaData.id_restauranteError) ? 'is-invalid' : ''} value={bebidaHeladaData.id_restaurante} onChange={(e) => setBebidaHeladaData({ ...bebidaHeladaData, id_restaurante: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {restaurantes.map((restaurante) => <option key={restaurante._id} value={restaurante._id}>{restaurante.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{bebidaHeladaData.id_restauranteError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                        </Col>

                        <Col md="6">
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Descripción</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl as="textarea" className={ (bebidaHeladaData.descripcionError) ? 'is-invalid' : ''} type="text" name="descripcion" value={bebidaHeladaData.descripcion} onChange={(e) => setBebidaHeladaData({ ...bebidaHeladaData, descripcion: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaHeladaData.descripcionError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Foto</Form.Label>
                                </Col>
                                <Col md="9">
                                    <FormGroup>
                                        <FileBase className={ (bebidaHeladaData.fotoError) ? 'is-invalid' : ''} type="file" multiple={false} name="foto" value={bebidaHeladaData.foto} onDone={({base64}) => setBebidaHeladaData({ ...bebidaHeladaData, foto: base64})}></FileBase>
                                        <small className="form-text text-danger">{bebidaHeladaData.fotoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <img className="img-fluid pr-5 pl-5" src={bebidaHeladaData.foto}/>
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

export default BebidaHeladaForm;