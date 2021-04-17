import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, createConsecutivo, updateConsecutivo, deleteConsecutivo } from '../../actions/consecutivos';
import { createProducto, getProductos, updateProducto } from '../../actions/productos';

const ProductoUtencilioForm = ({currentId, setCurrenteId, isOpen, setshow, currentConsecutivo, setCurrentConsecutivo}) => {

    const dispatch = useDispatch();
    const restaurantes = useSelector((state) => state.restaurantes);
    const consecutivos = useSelector((state) => state.consecutivos);
    const marcas = useSelector((state) => state.marcas);
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("")
    const utencilio = useSelector((state) => currentId ? state.productos.find((b) => b._id === currentId) : null);

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Equipos y Utencilios', 
        descripcion: 'Equipos y Utencilio creado automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const [utencilioData, setUtencilioData] = useState({
        id_consecutivo: '',
        codigo: '',
        nombre: '', 
        cantidad: '',
        id_restaurante: '',
        id_marca: '',
        descripcion: '', 
        nombreError: '', 
        cantidadError: '',
        id_restauranteError: '',
        id_marcaError: '',
        descripcionError: ''
    });


    const validate = () => {

        let nombreError = '';
        let cantidadError = '';
        let id_restauranteError = '';
        let id_marcaError = '';
        let descripcionError = '';

        if(!utencilioData.nombre){
            nombreError = 'Debe ingresar el nombre del utencilio';
        }

        if(!utencilioData.cantidad){
            cantidadError = 'Debe ingresar la cantidad del utencilio';
        }else if(utencilioData.cantidad < 1){
            cantidadError = 'Números deben ser mayor a 0';
        }

        if(!utencilioData.id_restaurante){
            id_restauranteError = 'Debe seleccionar el restaurante del utencilio';
        }

        if(!utencilioData.id_marca){
            id_marcaError = 'Debe seleccionar la marca del utencilio';
        }

        if(!utencilioData.descripcion){
            descripcionError = 'Debe ingresar la descripción del utencilio';
        }
    
        if(nombreError || cantidadError || id_restauranteError || id_marcaError || descripcionError  ){
            setUtencilioData({ ...utencilioData, nombreError, cantidadError, id_restauranteError, id_marcaError, descripcionError});
            return false;
        }
        
        return true;
    }

    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;

        consecutivos.forEach(consecutivo => {

            if(consecutivo.prefijo === "EU-"){

                if(consecutivo.valor > valorMayor){

                    valorMayor = consecutivo.valor;
                }
                codigoEncontrado = true;
            }
        });

        valorMayor++;

        if(!codigoEncontrado){
            consecutivoData.valor= 1;
            consecutivoData.prefijo = 'EU-';
            
            codigo = `EU-1`;
        }else{

            codigo = `EU-${valorMayor}`;

            consecutivoData.valor= valorMayor++;
            consecutivoData.prefijo = 'EU-';
        }

        utencilioData.codigo = codigo;

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
    useEffect(() => { if(utencilio){setUtencilioData(utencilio)} }, [utencilio]);

    useEffect(() => {
        dispatch(getConsecutivos());

    }, [ dispatch, tempIdConsecutivo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updateProducto(currentId, utencilioData));
                setCurrenteId(null);
                dispatch(getProductos());
                clearForm();
                setshow(false);
            }else{

                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setUtencilioData({ ...utencilioData, id_consecutivo : tempIdConsecutivo});
                dispatch(createProducto(utencilioData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        setCurrenteId(null);
        setUtencilioData({
            nombre: '', 
            cantidad: '',
            id_restaurante: '',
            id_marca: '',
            descripcion: '', 
            nombreError: '', 
            cantidadError: '',
            id_restauranteError: '',
            id_marcaError: '',
            descripcionError: ''       
        });
    }
    
    
    return(

        <Modal size="m" show={isOpen} onHide={setshow} onExit={clearForm} className="modal" >
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Utencilio' : 'Crear Utencilio'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="3"className="text-right pt-1">
                            <Form.Label >Código</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl type="text" disabled name="codigo" value={ !currentId ? generarCodigo() : utencilioData.codigo}></FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Restaurante</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Form.Control as="select" name="id_restaurante"  className={ (utencilioData.id_restauranteError) ? 'is-invalid' : ''} value={utencilioData.id_restaurante} onChange={(e) => setUtencilioData({ ...utencilioData, id_restaurante: e.target.value})} >
                                    <option value="">--Seleccione--</option>
                                    {restaurantes.map((restaurante) => <option key={restaurante._id} value={restaurante._id}>{restaurante.nombre}</option>)}               
                                </Form.Control>
                                <small className="form-text text-danger">{utencilioData.id_restauranteError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Nombre</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (utencilioData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={utencilioData.nombre} onChange={(e) => setUtencilioData({ ...utencilioData, nombre: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{utencilioData.nombreError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Marca</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Form.Control as="select" name="id_marca"  className={ (utencilioData.id_marcaError) ? 'is-invalid' : ''} value={utencilioData.id_marca} onChange={(e) => setUtencilioData({ ...utencilioData, id_marca: e.target.value})} >
                                    <option value="">--Seleccione--</option>
                                    {marcas.map((marca) => <option key={marca._id} value={marca._id}>{marca.nombre}</option>)}               
                                </Form.Control>
                                <small className="form-text text-danger">{utencilioData.id_marcaError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Cantidad</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (utencilioData.cantidadError) ? 'is-invalid' : ''} type="number" name="cantidad" value={utencilioData.cantidad} onChange={(e) => setUtencilioData({ ...utencilioData, cantidad: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{utencilioData.cantidadError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Descripción</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl as="textarea" className={ (utencilioData.descripcionError) ? 'is-invalid' : ''} type="text" name="descripcion" value={utencilioData.descripcion} onChange={(e) => setUtencilioData({ ...utencilioData, descripcion: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{utencilioData.descripcionError}</small>
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

export default ProductoUtencilioForm;