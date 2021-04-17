import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, updateConsecutivo, createConsecutivo } from '../../actions/consecutivos';
import { createProducto, getProductos, updateProducto } from '../../actions/productos';

const ProductoDesechableForm = ({currentId, setCurrenteId, isOpen, setshow, currentConsecutivo, setCurrentConsecutivo, selectedConsecutivo}) => {

    const dispatch = useDispatch();
    const restaurantes = useSelector((state) => state.restaurantes);
    const marcas = useSelector((state) => state.marcas);
    const consecutivos = useSelector((state) => state.consecutivos);
    const desechable = useSelector((state) => currentId ? state.productos.find((b) => b._id === currentId) : null);
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Desechables y Empaques', 
        descripcion: 'Desechable o Empaque creado automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const [desechableData, setDesechableData] = useState({
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

        if(!desechableData.nombre){
            nombreError = 'Debe ingresar el nombre del desechable';
        }

        if(!desechableData.cantidad){
            cantidadError = 'Debe ingresar la cantidad del desechable';
        }else if(desechableData.cantidad < 1){
            cantidadError = 'Números deben ser mayor a 0';
        }

        if(!desechableData.id_restaurante){
            id_restauranteError = 'Debe seleccionar el restaurante del desechable';
        }

        if(!desechableData.id_marca){
            id_marcaError = 'Debe seleccionar la marca del desechable';
        }

        if(!desechableData.descripcion){
            descripcionError = 'Debe ingresar la descripción del desechable';
        }
    
        if(nombreError || cantidadError || id_restauranteError || id_marcaError || descripcionError  ){
            setDesechableData({ ...desechableData, nombreError, cantidadError, id_restauranteError, id_marcaError, descripcionError});
            return false;
        }
        
        return true;
    }


    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'DE-';

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

        desechableData.codigo = codigo;

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
    useEffect(() => { if(desechable){setDesechableData(desechable)} }, [desechable]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updateProducto(currentId, desechableData));
                setCurrenteId(null);
                dispatch(getProductos());
                clearForm();
                setshow(false);
            }else{

                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setDesechableData({ ...desechableData, id_consecutivo : tempIdConsecutivo});
                dispatch(createProducto(desechableData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        setCurrenteId(null);
        setDesechableData({
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
            <Modal.Title>{ currentId ? 'Editar Desechable y Empaques' : 'Crear Desechable y Empaques'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="3"className="text-right pt-1">
                            <Form.Label >Código</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl type="text" disabled name="codigo" value={!currentId ? generarCodigo() : desechableData.codigo}></FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Restaurante</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Form.Control as="select" name="id_restaurante"  className={ (desechableData.id_restauranteError) ? 'is-invalid' : ''} value={desechableData.id_restaurante} onChange={(e) => setDesechableData({ ...desechableData, id_restaurante: e.target.value})} >
                                    <option value="">--Seleccione--</option>
                                    {restaurantes.map((restaurante) => <option key={restaurante._id} value={restaurante._id}>{restaurante.nombre}</option>)}               
                                </Form.Control>
                                <small className="form-text text-danger">{desechableData.id_restauranteError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Nombre</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (desechableData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={desechableData.nombre} onChange={(e) => setDesechableData({ ...desechableData, nombre: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{desechableData.nombreError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Marca</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Form.Control as="select" name="id_marca"  className={ (desechableData.id_marcaError) ? 'is-invalid' : ''} value={desechableData.id_marca} onChange={(e) => setDesechableData({ ...desechableData, id_marca: e.target.value})} >
                                    <option value="">--Seleccione--</option>
                                    {marcas.map((marca) => <option key={marca._id} value={marca._id}>{marca.nombre}</option>)}               
                                </Form.Control>
                                <small className="form-text text-danger">{desechableData.id_marcaError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Cantidad</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (desechableData.cantidadError) ? 'is-invalid' : ''} type="number" name="cantidad" value={desechableData.cantidad} onChange={(e) => setDesechableData({ ...desechableData, cantidad: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{desechableData.cantidadError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Descripción</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl as="textarea" className={ (desechableData.descripcionError) ? 'is-invalid' : ''} type="text" name="descripcion" value={desechableData.descripcion} onChange={(e) => setDesechableData({ ...desechableData, descripcion: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{desechableData.descripcionError}</small>
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

export default ProductoDesechableForm;