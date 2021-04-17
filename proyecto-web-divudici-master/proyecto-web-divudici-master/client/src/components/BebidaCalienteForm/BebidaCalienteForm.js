import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, updateConsecutivo, createConsecutivo } from '../../actions/consecutivos';
import { createBebida, getBebidas, updateBebida } from '../../actions/bebidas';
import FileBase from 'react-file-base64';
import { createBitacora } from '../../actions/bitacoras';



const BebidaCalienteForm = ({currentId, setCurrenteId, isOpen, setshow, bitacoraData, generarCodigoBitacora, bitacoraConsecutivoData}) => {

    const dispatch = useDispatch();
    const restaurantes = useSelector((state) => state.restaurantes);
    const consecutivos = useSelector((state) => state.consecutivos);
    const bebida = useSelector((state) => currentId ? state.bebidas.find((b) => b._id === currentId) : null);
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Bebidas Calientes', 
        descripcion: 'Bebida Caliente creada automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const [bebidaData, setBebidaData] = useState({
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

        if(!bebidaData.nombre){
            nombreError = 'Debe ingresar el nombre de la bebida';
        }

        if(bebidaData.ingredientes.length < 1){
            ingredientesError = 'Debe ingresar los ingredientes de la bebida';
        }

        if(!bebidaData.precioUnitario){
            precioUnitarioError = 'Debe ingresar el precio de la bebida';
        }else if(bebidaData.precioUnitario < 1){
            precioUnitarioError = 'Números deben ser mayor a 0';
        }

        if(!bebidaData.id_restaurante){
            id_restauranteError = 'Debe seleccionar el restaurante de la bebida';
        }

        if(!bebidaData.descripcion){
            descripcionError = 'Debe ingresar la descripción de la bebida';
        }

        if(!bebidaData.foto){
            fotoError = 'Debe subir una foto de la bebida ';
        }

    
        if(nombreError || descripcionError || ingredientesError || precioUnitarioError || id_restauranteError || fotoError){
            setBebidaData({ ...bebidaData, nombreError, descripcionError, ingredientesError, precioUnitarioError, id_restauranteError, fotoError});
            return false;
        }
        
        return true;
    }


    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'BC-';

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

        bebidaData.codigo = codigo;

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
    useEffect(() => { if(bebida){setBebidaData(bebida)} }, [bebida]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                generarCodigoBitacora();
                dispatch(createConsecutivo(bitacoraConsecutivoData));
                bitacoraData.descripcion =  `Edición de la bebida ${bebidaData.codigo}`;
                dispatch(createBitacora(bitacoraData));
                dispatch(updateBebida(currentId, bebidaData));
                setCurrenteId(null);
                dispatch(getBebidas());
                clearForm();
                setshow(false);
            }else{
                generarCodigoBitacora();
                dispatch(createConsecutivo(bitacoraConsecutivoData));
                bitacoraData.descripcion =  `Creación de la bebida ${bebidaData.codigo}`;
                dispatch(createBitacora(bitacoraData));
                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setBebidaData({ ...bebidaData, id_consecutivo : tempIdConsecutivo});
                dispatch(createBebida(bebidaData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        setCurrenteId(null);
        setBebidaData({
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
            <Modal.Title>{ currentId ? 'Editar Bebida Caliente' : 'Crear Bebida Caliente'}</Modal.Title>
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
                                        <FormControl type="text" disabled name="codigo" value={!currentId ? generarCodigo() : bebidaData.codigo}></FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Nombre</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (bebidaData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={bebidaData.nombre} onChange={(e) => setBebidaData({ ...bebidaData, nombre: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaData.nombreError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                        

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Ingredientes</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl as="textarea" className={ (bebidaData.ingredientesError) ? 'is-invalid' : ''} type="text" name="descripcion" value={bebidaData.ingredientes} onChange={(e) => setBebidaData({ ...bebidaData, ingredientes: e.target.value.split(",")})} placeholder="Separar ingredientes usando una coma"></FormControl>
                                        <small className="form-text text-danger">{bebidaData.ingredientesError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Precio</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (bebidaData.precioUnitarioError) ? 'is-invalid' : ''} type="number" name="precioUnitario" value={bebidaData.precioUnitario} onChange={(e) => setBebidaData({ ...bebidaData, precioUnitario: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaData.precioUnitarioError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Restaurante</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_restaurante"  className={ (bebidaData.id_restauranteError) ? 'is-invalid' : ''} value={bebidaData.id_restaurante} onChange={(e) => setBebidaData({ ...bebidaData, id_restaurante: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {restaurantes.map((restaurante) => <option key={restaurante._id} value={restaurante._id}>{restaurante.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{bebidaData.id_restauranteError}</small>
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
                                        <FormControl as="textarea" className={ (bebidaData.descripcionError) ? 'is-invalid' : ''} type="text" name="descripcion" value={bebidaData.descripcion} onChange={(e) => setBebidaData({ ...bebidaData, descripcion: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaData.descripcionError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Foto</Form.Label>
                                </Col>
                                <Col md="9">
                                    <FormGroup>
                                        <FileBase className={ (bebidaData.fotoError) ? 'is-invalid' : ''} type="file" multiple={false} name="foto" value={bebidaData.foto} onDone={({base64}) => setBebidaData({ ...bebidaData, foto: base64})}></FileBase>
                                        <small className="form-text text-danger">{bebidaData.fotoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <img className="img-fluid pr-5 pl-5" src={bebidaData.foto}/>
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

export default BebidaCalienteForm;