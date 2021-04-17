import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, updateConsecutivo, createConsecutivo } from '../../actions/consecutivos';
import { createProducto, getProductos, updateProducto } from '../../actions/productos';

const ProductoLimpiezaForm = ({currentId, setCurrenteId, isOpen, setshow, currentConsecutivo, setCurrentConsecutivo}) => {

    const dispatch = useDispatch();
    const restaurantes = useSelector((state) => state.restaurantes);
    const marcas = useSelector((state) => state.marcas);
    const unidadesMedidas = useSelector((state) => state.unidadesMedidas);
    const consecutivos = useSelector((state) => state.consecutivos);
    const limpieza = useSelector((state) => currentId ? state.productos.find((b) => b._id === currentId) : null);

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Limpieza e Higiene', 
        descripcion: 'Producto de limpieza creado automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const [limpiezaData, setLimpiezaData] = useState({
        id_consecutivo: '',
        codigo: '',
        nombre: '', 
        cantidad: '',
        tipo: '', 
        id_restaurante: '',
        id_marca: '',
        id_unidad_medida: '',
        descripcion: '',
        cantidadMedida: '',
        nombreError: '', 
        cantidadError: '',
        tipoError: '', 
        id_restauranteError: '',
        id_unidad_medidaError: '',
        id_marcaError: '',
        descripcionError: '',
        cantidadMedidaError: ''
    });


    const validate = () => {

        let nombreError = '';
        let cantidadError = '';
        let tipoError = '';
        let id_restauranteError = '';
        let id_marcaError = '';
        let descripcionError = '';
        let cantidadMedidaError = '';
        let id_unidad_medidaError = '';

        if(!limpiezaData.nombre){
            nombreError = 'Debe ingresar el nombre del artículo de limpieza';
        }

        if(!limpiezaData.cantidad){
            cantidadError = 'Debe ingresar la cantidad del artículo de limpieza';
        }else if(limpiezaData.cantidad < 1){
            cantidadError = 'Números deben ser mayor a 0';
        }

        if(!limpiezaData.cantidadMedida){
            cantidadMedidaError = 'Debe ingresar la cantidad de medida del artículo de limpieza';
        }else if(limpiezaData.cantidad < 1){
            cantidadMedidaError = 'Números deben ser mayor a 0';
        }

        if(!limpiezaData.tipo){
            tipoError = 'Debe ingresar el tipo de limpieza';
        }

        if(!limpiezaData.id_restaurante){
            id_restauranteError = 'Debe seleccionar el restaurante del artículo de limpieza';
        }

        if(!limpiezaData.id_marca){
            id_marcaError = 'Debe seleccionar la marca del artículo de limpieza';
        }

        if(!limpiezaData.descripcion){
            descripcionError = 'Debe ingresar la descripción del artículo de limpieza';
        }

        if(!limpiezaData.id_unidad_medida){
            id_unidad_medidaError = 'Debe seleccionar la unidad de medida del artículo de limpieza';
        }
    
        if(nombreError || cantidadError || tipoError || id_restauranteError || id_marcaError || cantidadMedidaError || descripcionError || id_unidad_medidaError ){
            setLimpiezaData({ ...limpiezaData, nombreError, cantidadError, tipoError, id_restauranteError, id_marcaError, cantidadMedidaError, descripcionError, id_unidad_medidaError});
            return false;
        }
        
        return true;
    }

    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'LH-';

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

        limpiezaData.codigo = codigo;

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
    useEffect(() => { if(limpieza){setLimpiezaData(limpieza)} }, [limpieza]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updateProducto(currentId, limpiezaData));
                setCurrenteId(null);
                dispatch(getProductos());
                clearForm();
                setshow(false);
            }else{

                dispatch(createConsecutivo(consecutivoData));
                setCurrentConsecutivo(getConsecutivoId());
                setLimpiezaData({ ...limpiezaData, id_consecutivo : currentConsecutivo});
                dispatch(createProducto(limpiezaData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        setCurrenteId(null);
        setLimpiezaData({
            nombre: '', 
            cantidad: '',
            tipo: '', 
            id_restaurante: '',
            id_marca: '',
            id_unidad_medida: '',
            descripcion: '',
            cantidadMedida: '',
            nombreError: '', 
            cantidadError: '',
            tipoError: '', 
            id_restauranteError: '',
            id_unidad_medidaError: '',
            id_marcaError: '',
            descripcionError: '',
            cantidadMedidaError: ''      
        });
    }
    
    
    return(

        <Modal size="xl" show={isOpen} onHide={setshow} onExit={clearForm} className="modal" >
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Limpieza e Higiene' : 'Crear Limpieza e Higiene'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="6">
                            <Row>
                                <Col md="3"className="text-right pt-1">
                                    <Form.Label >Código</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl type="text" disabled name="codigo" value={!currentId ? generarCodigo() : limpiezaData.codigo}></FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Restaurante</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_restaurante"  className={ (limpiezaData.id_restauranteError) ? 'is-invalid' : ''} value={limpiezaData.id_restaurante} onChange={(e) => setLimpiezaData({ ...limpiezaData, id_restaurante: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {restaurantes.map((restaurante) => <option key={restaurante._id} value={restaurante._id}>{restaurante.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{limpiezaData.id_restauranteError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Nombre</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (limpiezaData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={limpiezaData.nombre} onChange={(e) => setLimpiezaData({ ...limpiezaData, nombre: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{limpiezaData.nombreError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Marca</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_marca"  className={ (limpiezaData.id_marcaError) ? 'is-invalid' : ''} value={limpiezaData.id_marca} onChange={(e) => setLimpiezaData({ ...limpiezaData, id_marca: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {marcas.map((marca) => <option key={marca._id} value={marca._id}>{marca.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{limpiezaData.id_marcaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Cantidad</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (limpiezaData.cantidadError) ? 'is-invalid' : ''} type="number" name="cantidad" value={limpiezaData.cantidad} onChange={(e) => setLimpiezaData({ ...limpiezaData, cantidad: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{limpiezaData.cantidadError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Descripción</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl as="textarea" className={ (limpiezaData.descripcionError) ? 'is-invalid' : ''} type="text" name="descripcion" value={limpiezaData.descripcion} onChange={(e) => setLimpiezaData({ ...limpiezaData, descripcion: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{limpiezaData.descripcionError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>

                        <Col md="6">
                            
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Tipo</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_restaurante"  className={ (limpiezaData.tipoError) ? 'is-invalid' : ''} value={limpiezaData.tipo} onChange={(e) => setLimpiezaData({ ...limpiezaData, tipo: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            <option value="Aceites">Aceites</option>
                                            <option value="Cacao">Cacao</option>
                                            <option value="Carnes">Carnes</option>
                                            <option value="Cereales">Cereales</option>
                                            <option value="Frutas">Frutas</option>
                                            <option value="Frutos Secos">Frutos Secos</option>
                                            <option value="Legumbres">Legumbres</option>
                                            <option value="Vegetales">Vegetales</option>   
                                        </Form.Control>
                                        <small className="form-text text-danger">{limpiezaData.tipoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right">
                                    <Form.Label>Cantidad de Medida</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (limpiezaData.cantidadMedidaError) ? 'is-invalid' : ''} type="number" name="cantidadMedida" value={limpiezaData.cantidadMedida} onChange={(e) => setLimpiezaData({ ...limpiezaData, cantidadMedida: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{limpiezaData.cantidadMedidaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right">
                                    <Form.Label>Unidad de Medida</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_unidad_medida"  className={ (limpiezaData.id_unidad_medidaError) ? 'is-invalid' : ''} value={limpiezaData.id_unidad_medida} onChange={(e) => setLimpiezaData({ ...limpiezaData, id_unidad_medida: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {unidadesMedidas.map((unidad) => <option key={unidad._id} value={unidad._id}>{unidad.unidad}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{limpiezaData.id_unidad_medidaError}</small>
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

export default ProductoLimpiezaForm;