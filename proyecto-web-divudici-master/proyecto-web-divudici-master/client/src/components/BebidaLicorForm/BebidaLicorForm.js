import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, updateConsecutivo, createConsecutivo } from '../../actions/consecutivos';
import { createBebida, getBebidas, updateBebida } from '../../actions/bebidas';
import FileBase from 'react-file-base64';



const BebidaLicorForm = ({currentId, setCurrenteId, isOpen, setshow, currentConsecutivo, setCurrentConsecutivo, selectedConsecutivo}) => {

    const dispatch = useDispatch();
    const restaurantes = useSelector((state) => state.restaurantes);
    const marcas = useSelector((state) => state.marcas);
    const nacionalidades = useSelector((state) => state.paises);
    const consecutivos = useSelector((state) => state.consecutivos);
    const [checkedPrecioUnitario, setCheckedPrecioUnitario] = useState(false);
    const [checkedPrecioBotella, setCheckedPrecioBotella] = useState(false);
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Licores', 
        descripcion: 'Licor creado automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const bebida = useSelector((state) => currentId ? state.bebidas.find((b) => b._id === currentId) : null);

    const [bebidaLicorData, setBebidaLicorData] = useState({
        id_consecutivo: '',
        codigo: '',
        nombre: '', 
        id_marca: '',
        id_nacionalidad: '',
        precioUnitario: '',
        precioBotella: '',
        id_restaurante: '',
        cantidad: '', 
        descripcion: '',
        foto: '',
        nombreError: '', 
        id_marcaError: '',
        id_nacionalidadError: '',
        precioUnitarioError: '',
        precioBotellaError: '',
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
        let precioBotellaError = '';
        let id_restauranteError = '';
        let cantidadError = '';
        let descripcionError = '';
        let fotoError = '';

        if(!bebidaLicorData.nombre){
            nombreError = 'Debe ingresar el nombre del licor';
        }

        if(!bebidaLicorData.id_marca){
            id_marcaError = 'Debe ingresar la marca del licor';
        }

        if(!bebidaLicorData.id_nacionalidad){
            id_nacionalidadError = 'Debe ingresar la nacionalidad del licor';
        }

        if(checkedPrecioUnitario &&  !bebidaLicorData.precioUnitario){
            precioUnitarioError = 'Debe ingresar el precio del licor';
        }else if(checkedPrecioUnitario &&  bebidaLicorData.precioUnitario < 1){
            precioUnitarioError = 'Números deben ser mayor a 0';
        }

        if(checkedPrecioBotella &&  !bebidaLicorData.precioBotella){
            precioBotellaError = 'Debe ingresar el precio de la botella';
        }else if(checkedPrecioBotella &&  bebidaLicorData.precioBotella < 1){
            precioBotellaError = 'Números deben ser mayor a 0';
        }

        if(!bebidaLicorData.cantidad){
            cantidadError = 'Debe ingresar la cantidad de unidades licor';
        }else if(bebidaLicorData.cantidad < 1){
            cantidadError = 'Números deben ser mayor a 0';
        }

        if(!bebidaLicorData.id_restaurante){
            id_restauranteError = 'Debe seleccionar el restaurante del licor';
        }

        if(!bebidaLicorData.descripcion){
            descripcionError = 'Debe ingresar la descripción del licor';
        }

        if(!bebidaLicorData.foto){
            fotoError = 'Debe subir una foto del licor';
        }

    
        if(nombreError || descripcionError || id_marcaError || id_nacionalidadError || precioUnitarioError || precioBotellaError || id_restauranteError || cantidadError || fotoError){
            setBebidaLicorData({ ...bebidaLicorData, nombreError, descripcionError, id_marcaError, id_nacionalidadError, precioUnitarioError, precioBotellaError, id_restauranteError, cantidadError, fotoError});
            return false;
        }
        
        return true;
    }

    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'L-';

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

        bebidaLicorData.codigo = codigo;

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
    useEffect(() => { if(bebida){setBebidaLicorData(bebida)} }, [bebida]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updateBebida(currentId, bebidaLicorData));
                setCurrenteId(null);
                dispatch(getBebidas());
                clearForm();
                setshow(false);
            }else{

                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setBebidaLicorData({ ...bebidaLicorData, id_consecutivo : tempIdConsecutivo});
                dispatch(createBebida(bebidaLicorData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        setCurrenteId(null);
        setBebidaLicorData({
            nombre: '', 
            id_marca: '',
            id_nacionalidad: '',
            precioUnitario: '',
            precioBotella: '',
            id_restaurante: '',
            cantidad: '', 
            descripcion: '',
            foto: '',
            nombreError: '', 
            id_marcaError: '',
            id_nacionalidadError: '',
            precioUnitarioError: '',
            precioBotellaError: '',
            id_restauranteError: '', 
            cantidadError: '', 
            descripcionError: '',
            fotoError: ''       
        });
    }
    
    
    return(

        <Modal size="lg" show={isOpen} onHide={setshow} onExit={clearForm} className="modal" >
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Licor' : 'Crear Licor'}</Modal.Title>
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
                                        <FormControl type="text" disabled name="codigo" value={!currentId ? generarCodigo() : bebidaLicorData.codigo}></FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Nombre</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (bebidaLicorData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={bebidaLicorData.nombre} onChange={(e) => setBebidaLicorData({ ...bebidaLicorData, nombre: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaLicorData.nombreError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Marca</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_marca"  className={ (bebidaLicorData.id_marcaError) ? 'is-invalid' : ''} value={bebidaLicorData.id_marca} onChange={(e) => setBebidaLicorData({ ...bebidaLicorData, id_marca: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {marcas.map((marca) => <option key={marca._id} value={marca._id}>{marca.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{bebidaLicorData.id_marcaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Nacionalidad</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_nacionalidad"  className={ (bebidaLicorData.id_nacionalidadError) ? 'is-invalid' : ''} value={bebidaLicorData.id_nacionalidad} onChange={(e) => setBebidaLicorData({ ...bebidaLicorData, id_nacionalidad: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {nacionalidades.map((nacionalidad) => <option key={nacionalidad._id} value={nacionalidad._id}>{nacionalidad.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{bebidaLicorData.id_nacionalidadError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <FormGroup>
                                        <Form.Check type="checkbox" label="Precio Unitario" name="" defaultChecked={checkedPrecioUnitario} onChange={(e) => {setBebidaLicorData({ ...bebidaLicorData, tienePrefijo: e.target.checked});  setCheckedPrecioUnitario(!checkedPrecioUnitario); }}/>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (bebidaLicorData.precioUnitarioError) ? 'is-invalid' : ''} type="number" name="precioUnitario" value={bebidaLicorData.precioUnitario} onChange={(e) => setBebidaLicorData({ ...bebidaLicorData, precioUnitario: e.target.value})} disabled={!checkedPrecioUnitario}></FormControl>
                                        <small className="form-text text-danger">{bebidaLicorData.precioUnitarioError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <FormGroup>
                                        <Form.Check type="checkbox" label="Precio Botella" name="" defaultChecked={checkedPrecioBotella} onChange={(e) => {setBebidaLicorData({ ...bebidaLicorData, tienePrefijo: e.target.checked});  setCheckedPrecioBotella(!checkedPrecioBotella); }}/>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (bebidaLicorData.precioBotellaError) ? 'is-invalid' : ''} type="number" name="precioBotella" value={bebidaLicorData.precioBotella} onChange={(e) => setBebidaLicorData({ ...bebidaLicorData, precioBotella: e.target.value})} disabled={!checkedPrecioBotella}></FormControl>
                                        <small className="form-text text-danger">{bebidaLicorData.precioBotellaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Restaurante</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control as="select" name="id_restaurante"  className={ (bebidaLicorData.id_restauranteError) ? 'is-invalid' : ''} value={bebidaLicorData.id_restaurante} onChange={(e) => setBebidaLicorData({ ...bebidaLicorData, id_restaurante: e.target.value})} >
                                            <option value="">--Seleccione--</option>
                                            {restaurantes.map((restaurante) => <option key={restaurante._id} value={restaurante._id}>{restaurante.nombre}</option>)}               
                                        </Form.Control>
                                        <small className="form-text text-danger">{bebidaLicorData.id_restauranteError}</small>
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
                                        <FormControl className={ (bebidaLicorData.cantidadError) ? 'is-invalid' : ''} type="number" name="cantidad" value={bebidaLicorData.cantidad} onChange={(e) => setBebidaLicorData({ ...bebidaLicorData, cantidad: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaLicorData.cantidadError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Descripción</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl as="textarea" className={ (bebidaLicorData.descripcionError) ? 'is-invalid' : ''} type="text" name="descripcion" value={bebidaLicorData.descripcion} onChange={(e) => setBebidaLicorData({ ...bebidaLicorData, descripcion: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{bebidaLicorData.descripcionError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Foto</Form.Label>
                                </Col>
                                <Col md="9">
                                    <FormGroup>
                                        <FileBase className={ (bebidaLicorData.fotoError) ? 'is-invalid' : ''} type="file" multiple={false} name="foto" value={bebidaLicorData.foto} onDone={({base64}) => setBebidaLicorData({ ...bebidaLicorData, foto: base64})}></FileBase>
                                        <small className="form-text text-danger">{bebidaLicorData.fotoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <img className="img-fluid pr-5 pl-5" src={bebidaLicorData.foto}/>
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

export default BebidaLicorForm;