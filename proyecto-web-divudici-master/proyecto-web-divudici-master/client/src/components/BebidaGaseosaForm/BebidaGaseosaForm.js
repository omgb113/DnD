import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, updateConsecutivo, createConsecutivo } from '../../actions/consecutivos';
import { createBebida, getBebidas, updateBebida } from '../../actions/bebidas';
import FileBase from 'react-file-base64';



const BebidaGaseosaForm = ({currentId, setCurrenteId, isOpen, setshow, currentConsecutivo, setCurrentConsecutivo, selectedConsecutivo}) => {

    const dispatch = useDispatch();
    const restaurantes = useSelector((state) => state.restaurantes);
    const marcas = useSelector((state) => state.marcas);
    const nacionalidades = useSelector((state) => state.paises);
    const consecutivos = useSelector((state) => state.consecutivos);
    const bebida = useSelector((state) => currentId ? state.bebidas.find((b) => b._id === currentId) : null);
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Bebidas Gaseosas', 
        descripcion: 'Bebida gaseosa creada automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const [bebidaGaseosaData, setBebidaGaseosaData] = useState({
        id_consecutivo: '',
        codigo: '',
        nombre: '', 
        id_marca: '',
        id_nacionalidad: '',
        precioUnitario: '',
        id_restaurante: '',
        cantidad: '', 
        descripcion: '',
        foto: '',
        nombreError: '', 
        id_marcaError: '',
        id_nacionalidadError: '',
        precioUnitarioError: '',
        id_restauranteError: '', 
        cantidadError: '', 
        descripcionError: '',
        fotoError: ''

    });


    const validate = () => {

        let nombreError = '';
        let id_marcaError = '';
        let id_nacionalidadError = '';
        let precioUnitarioError = '';
        let id_restauranteError = '';
        let cantidadError = '';
        let descripcionError = '';
        let fotoError = '';

        if(!bebidaGaseosaData.nombre){
            nombreError = 'Debe ingresar el nombre de la bebida';
        }

        if(!bebidaGaseosaData.id_marca){
            id_marcaError = 'Debe ingresar la marca de la bebida';
        }

        if(!bebidaGaseosaData.id_nacionalidad){
            id_nacionalidadError = 'Debe ingresar la nacionalidad de la bebida';
        }

        if(!bebidaGaseosaData.precioUnitario){
            precioUnitarioError = 'Debe ingresar el precio de la bebida';
        }else if(bebidaGaseosaData.precioUnitario < 1){
            precioUnitarioError = 'Números deben ser mayor a 0';
        }

        if(!bebidaGaseosaData.cantidad){
            cantidadError = 'Debe ingresar la cantidad de la bebida';
        }else if(bebidaGaseosaData.cantidad < 1){
            cantidadError = 'Números deben ser mayor a 0';
        }

        if(!bebidaGaseosaData.id_restaurante){
            id_restauranteError = 'Debe seleccionar el restaurante de la bebida';
        }

        if(!bebidaGaseosaData.descripcion){
            descripcionError = 'Debe ingresar la descripción de la bebida';
        }

        if(!bebidaGaseosaData.foto){
            fotoError = 'Debe subir una foto de la bebida ';
        }

    
        if(nombreError || descripcionError || id_marcaError || id_nacionalidadError || precioUnitarioError || id_restauranteError || cantidadError || fotoError){
            setBebidaGaseosaData({ ...bebidaGaseosaData, nombreError, descripcionError, id_marcaError, id_nacionalidadError, precioUnitarioError, id_restauranteError, cantidadError, fotoError});
            return false;
        }
        
        return true;
    }


    //populate data on edit
    useEffect(() => { if(bebida){setBebidaGaseosaData(bebida)} }, [bebida]);
    
    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'BG-';

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

        bebidaGaseosaData.codigo = codigo;

        return codigo;
    }

    const getConsecutivoId = () => {
        consecutivos.forEach(consecutivo => {
            if(consecutivo.prefijo === consecutivoData.prefijo && consecutivo.valor === consecutivoData.valor){
                return consecutivo._id;
            }
        });
    }

    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updateBebida(currentId, bebidaGaseosaData));
                setCurrenteId(null);
                dispatch(getBebidas());
                clearForm();
                setshow(false);
            }else{

                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setBebidaGaseosaData({ ...bebidaGaseosaData, id_consecutivo : tempIdConsecutivo});
                dispatch(createBebida(bebidaGaseosaData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        setCurrenteId(null);
        setBebidaGaseosaData({
            nombre: '', 
            id_marca: '',
            id_nacionalidad: '',
            precioUnitario: '',
            id_restaurante: '',
            cantidad: '', 
            descripcion: '',
            foto: '',
            nombreError: '', 
            id_marcaError: '',
            id_nacionalidadError: '',
            precioUnitarioError: '',
            id_restauranteError: '', 
            cantidadError: '', 
            descripcionError: '',
            fotoError: ''       
        });
    }
    
    
    return(

        <Modal size="lg" show={isOpen} onHide={setshow} onExit={clearForm} className="modal" >
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Bebida Gaseosa' : 'Crear Bebida Gaseosa'}</Modal.Title>
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
                                        <FormControl type="text" disabled name="codigo" value={!currentId ? generarCodigo() : bebidaGaseosaData.codigo}></FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Nombre</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (bebidaGaseosaData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={bebidaGaseosaData.nombre} onChange={(e) => setBebidaGaseosaData({ ...bebidaGaseosaData, nombre: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaGaseosaData.nombreError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Marca</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_marca"  className={ (bebidaGaseosaData.id_marcaError) ? 'is-invalid' : ''} value={bebidaGaseosaData.id_marca} onChange={(e) => setBebidaGaseosaData({ ...bebidaGaseosaData, id_marca: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {marcas.map((marca) => <option key={marca._id} value={marca._id}>{marca.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{bebidaGaseosaData.id_marcaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Nacionalidad</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_nacionalidad"  className={ (bebidaGaseosaData.id_nacionalidadError) ? 'is-invalid' : ''} value={bebidaGaseosaData.id_nacionalidad} onChange={(e) => setBebidaGaseosaData({ ...bebidaGaseosaData, id_nacionalidad: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {nacionalidades.map((nacionalidad) => <option key={nacionalidad._id} value={nacionalidad._id}>{nacionalidad.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{bebidaGaseosaData.id_nacionalidadError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Precio</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (bebidaGaseosaData.precioUnitarioError) ? 'is-invalid' : ''} type="number" name="precioUnitario" value={bebidaGaseosaData.precioUnitario} onChange={(e) => setBebidaGaseosaData({ ...bebidaGaseosaData, precioUnitario: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaGaseosaData.precioUnitarioError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Restaurante</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_restaurante"  className={ (bebidaGaseosaData.id_restauranteError) ? 'is-invalid' : ''} value={bebidaGaseosaData.id_restaurante} onChange={(e) => setBebidaGaseosaData({ ...bebidaGaseosaData, id_restaurante: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {restaurantes.map((restaurante) => <option key={restaurante._id} value={restaurante._id}>{restaurante.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{bebidaGaseosaData.id_restauranteError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                        </Col>


                        <Col md="6">
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Cantidad</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (bebidaGaseosaData.cantidadError) ? 'is-invalid' : ''} type="number" name="cantidad" value={bebidaGaseosaData.cantidad} onChange={(e) => setBebidaGaseosaData({ ...bebidaGaseosaData, cantidad: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaGaseosaData.cantidadError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Descripción</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl as="textarea" className={ (bebidaGaseosaData.descripcionError) ? 'is-invalid' : ''} type="text" name="descripcion" value={bebidaGaseosaData.descripcion} onChange={(e) => setBebidaGaseosaData({ ...bebidaGaseosaData, descripcion: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaGaseosaData.descripcionError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Foto</Form.Label>
                                </Col>
                                <Col md="9">
                                    <FormGroup>
                                        <FileBase className={ (bebidaGaseosaData.fotoError) ? 'is-invalid' : ''} type="file" multiple={false} name="foto" value={bebidaGaseosaData.foto} onDone={({base64}) => setBebidaGaseosaData({ ...bebidaGaseosaData, foto: base64})}></FileBase>
                                        <small className="form-text text-danger">{bebidaGaseosaData.fotoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <img className="img-fluid pr-5 pl-5" src={bebidaGaseosaData.foto}/>
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

export default BebidaGaseosaForm;