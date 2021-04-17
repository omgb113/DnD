import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, updateConsecutivo, createConsecutivo } from '../../actions/consecutivos';
import { createProducto, getProductos, updateProducto } from '../../actions/productos';
import { createBitacora } from '../../actions/bitacoras';

const ProductoComestibleForm = ({currentId, setCurrenteId, isOpen, setshow, bitacoraData, generarCodigoBitacora, bitacoraConsecutivoData}) => {

    const dispatch = useDispatch();
    const restaurantes = useSelector((state) => state.restaurantes);
    const marcas = useSelector((state) => state.marcas);
    const unidadesMedidas = useSelector((state) => state.unidadesMedidas);
    const consecutivos = useSelector((state) => state.consecutivos);
    const comestible = useSelector((state) => currentId ? state.productos.find((b) => b._id === currentId) : null);
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Comestibles', 
        descripcion: 'Comestible creado automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const [comestibleData, setComestibleData] = useState({
        id_consecutivo: '',
        codigo: '',
        nombre: '', 
        cantidad: '',
        tipo: '', 
        id_restaurante: '',
        id_marca: '',
        clase: '', 
        linea: '', 
        id_unidad_medida: '',
        nombreError: '', 
        cantidadError: '',
        tipoError: '', 
        id_restauranteError: '',
        id_marcaError: '',
        claseError: '', 
        lineaError: '', 
        id_unidad_medidaError: '',

    });


    const validate = () => {

        let nombreError = '';
        let cantidadError = '';
        let tipoError = '';
        let id_restauranteError = '';
        let id_marcaError = '';
        let claseError = '';
        let lineaError = '';
        let id_unidad_medidaError = '';

        if(!comestibleData.nombre){
            nombreError = 'Debe ingresar el nombre del comestible';
        }

        if(!comestibleData.cantidad){
            cantidadError = 'Debe ingresar la cantidad del comestible';
        }else if(comestibleData.cantidad < 1){
            cantidadError = 'Números deben ser mayor a 0';
        }

        if(!comestibleData.tipo){
            tipoError = 'Debe ingresar el tipo de comestible';
        }

        if(!comestibleData.id_restaurante){
            id_restauranteError = 'Debe seleccionar el restaurante del comestible';
        }

        if(!comestibleData.id_marca){
            id_marcaError = 'Debe seleccionar la marca del comestible';
        }

        if(!comestibleData.linea){
            lineaError = 'Debe seleccionar la línea del comestible';
        }

        if(!comestibleData.clase){
            claseError = 'Debe seleccionar la clase del comestible';
        }

        if(!comestibleData.id_unidad_medida){
            id_unidad_medidaError = 'Debe seleccionar la unidad de medida del comestible';
        }
    
        if(nombreError || cantidadError || tipoError || id_restauranteError || id_marcaError || claseError || lineaError || id_unidad_medidaError ){
            setComestibleData({ ...comestibleData, nombreError, cantidadError, tipoError, id_restauranteError, id_marcaError, claseError, lineaError, id_unidad_medidaError});
            return false;
        }
        
        return true;
    }

    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'COM-';

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

        comestibleData.codigo = codigo;

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
    useEffect(() => { if(comestible){setComestibleData(comestible)} }, [comestible]);
    

    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                generarCodigoBitacora();
                dispatch(createConsecutivo(bitacoraConsecutivoData));
                bitacoraData.descripcion =  `Edición del producto ${comestibleData.codigo}`;
                dispatch(createBitacora(bitacoraData));
                dispatch(updateProducto(currentId, comestibleData));
                setCurrenteId(null);
                dispatch(getProductos());
                clearForm();
                setshow(false);
            }else{
                generarCodigoBitacora();
                dispatch(createConsecutivo(bitacoraConsecutivoData));
                bitacoraData.descripcion =  `Creación del producto ${comestibleData.codigo}`;
                dispatch(createBitacora(bitacoraData));
                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setComestibleData({ ...comestibleData, id_consecutivo : tempIdConsecutivo});
                dispatch(createProducto(comestibleData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        setCurrenteId(null);
        setComestibleData({
            nombre: '', 
            cantidad: '',
            tipo: '', 
            id_restaurante: '',
            id_marca: '',
            clase: '', 
            linea: '', 
            id_unidad_medida: '',
            nombreError: '', 
            cantidadError: '',
            tipoError: '', 
            id_restauranteError: '',
            id_marcaError: '',
            claseError: '', 
            lineaError: '', 
            id_unidad_medidaError: ''       
        });
    }
    
    
    return(

        <Modal size="lg" show={isOpen} onHide={setshow} onExit={clearForm} className="modal" >
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Comestible' : 'Crear Comestible'}</Modal.Title>
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
                                        <FormControl type="text" disabled name="codigo" value={!currentId ? generarCodigo() : comestibleData.codigo}></FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Nombre</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (comestibleData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={comestibleData.nombre} onChange={(e) => setComestibleData({ ...comestibleData, nombre: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{comestibleData.nombreError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Cantidad</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (comestibleData.cantidadError) ? 'is-invalid' : ''} type="number" name="cantidad" value={comestibleData.cantidad} onChange={(e) => setComestibleData({ ...comestibleData, cantidad: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{comestibleData.cantidadError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Tipo</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_restaurante"  className={ (comestibleData.tipoError) ? 'is-invalid' : ''} value={comestibleData.tipo} onChange={(e) => setComestibleData({ ...comestibleData, tipo: e.target.value})} >
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
                                        <small className="form-text text-danger">{comestibleData.tipoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Restaurante</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_restaurante"  className={ (comestibleData.id_restauranteError) ? 'is-invalid' : ''} value={comestibleData.id_restaurante} onChange={(e) => setComestibleData({ ...comestibleData, id_restaurante: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {restaurantes.map((restaurante) => <option key={restaurante._id} value={restaurante._id}>{restaurante.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{comestibleData.id_restauranteError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                        </Col>

                        <Col md="6">
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Marca</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_marca"  className={ (comestibleData.id_marcaError) ? 'is-invalid' : ''} value={comestibleData.id_marca} onChange={(e) => setComestibleData({ ...comestibleData, id_marca: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {marcas.map((marca) => <option key={marca._id} value={marca._id}>{marca.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{comestibleData.id_marcaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Clase</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="clase"  className={ (comestibleData.claseError) ? 'is-invalid' : ''} value={comestibleData.clase} onChange={(e) => setComestibleData({ ...comestibleData, clase: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            <option value="Fibra">Fibra</option>
                                            <option value="Carbohidratos">Carbohidratos</option>
                                            <option value="Grasas">Grasas</option>
                                            <option value="Minerales">Minerales</option>
                                            <option value="Proteínas">Proteínas</option>
                                            <option value="Vitaminas">Vitaminas</option> 
                                        </Form.Control>
                                        <small className="form-text text-danger">{comestibleData.claseError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Línea</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="linea"  className={ (comestibleData.lineaError) ? 'is-invalid' : ''} value={comestibleData.linea} onChange={(e) => setComestibleData({ ...comestibleData, linea: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            <option value="Congelados">Congelados</option>
                                            <option value="Refrigerados">Refrigerados</option>
                                            <option value="Secos">Secos</option>
                                        </Form.Control>
                                        <small className="form-text text-danger">{comestibleData.lineaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Unidad de Medida</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_unidad_medida"  className={ (comestibleData.id_unidad_medidaError) ? 'is-invalid' : ''} value={comestibleData.id_unidad_medida} onChange={(e) => setComestibleData({ ...comestibleData, id_unidad_medida: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {unidadesMedidas.map((unidad) => <option key={unidad._id} value={unidad._id}>{unidad.unidad}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{comestibleData.id_unidad_medidaError}</small>
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

export default ProductoComestibleForm;