import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, createConsecutivo } from '../../actions/consecutivos';
import { createBitacora } from '../../actions/bitacoras';
import { createCliente, getClientes, updateCliente } from '../../actions/clientes';

const ClienteForm = ({currentId, setCurrenteId, isOpen, setshow, bitacoraData, generarCodigoBitacora, bitacoraConsecutivoData}) => {

    const dispatch = useDispatch();
    const restaurantes = useSelector((state) => state.restaurantes);
    const clientes = useSelector((state) => state.clientes);
    const consecutivos = useSelector((state) => state.consecutivos);
    const [checkedEdit, setCheckedEdit] = useState(false);
    const [radioValue, setRadioValue] = useState(null);
    const radios = [
        { name: 'Piccola Stella', value: 'Piccola Stella' },
        { name: 'Turin Anivo', value: 'Turin Anivo' },
        { name: 'Notte di Fuoco', value: 'seguridad' },
    ];
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");
    
    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Clientes', 
        descripcion: 'Cliente creado automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const cliente = useSelector((state) => currentId ? state.clientes.find((b) => b._id === currentId) : null);
    const [clienteData, setClienteData] = useState({
        id_consecutivo: '',
        codigo: '',
        nombre: '', 
        montopagado: '',
        detalle: '',
        fecha: '',
        reservacion: '',
        id_restaurante: '',
        nombreError: '', 
        montopagadoError: '',
        detalleError: '',
        fechaError: '',
        reservacionError: '',
        id_restauranteError: '',
    });

    const validate = () => {

        let nombreError = '';
        let montopagadoError = '';
        let detalleError = '';
        let fechaError = '';
        let reservacionError = '';
        let privilegioError = '';
        let id_restauranteError = '';


        if(!clienteData.nombre){
            nombreError = 'Debe ingresar el nombre del cliente';
        }

        if(!clienteData.montopagado){
            montopagadoError = 'Debe ingresar el monto del cliente';
        }

        if(!clienteData.detalle){
            detalleError = 'Debe ingresar el detalle de la factura';
        }

        if(!clienteData.fecha){
            fechaError = 'Debe ingresar la fecha de la factura';
         }//else if(clienteData.telefonoFijo < 0){
        //     telefonoFijoError = 'No se permiten números negativos';
        // }

        if(!clienteData.reservacion){
            reservacionError = 'Debe confirmar si hubo reserva';
         }else if(clienteData.telefonoFijo < 0){
        //     telefonoCelularError = 'No se permiten números negativos';
        // }

        if(!radioValue){
            privilegioError = 'Debe seleccionar un restaurante para el cliente';
        }else if(radioValue){

            if(radioValue === 'restaurante'){
                if(!clienteData.id_restaurante){
                    id_restauranteError = 'Debe seleccionar un restaurante';
                }
            }else{

                clienteData.id_restaurante = '604b84b824543a4dfcce467f';
            }
        }
    

        // if(!usuarioData.login){
        //     loginError = 'Debe ingresar el login del usuario';
        // }else if(verificarLogin()){
        //     loginError = 'El login no esta disponible';
        // }

        // if(!usuarioData.password){
        //     passwordError = 'Debe ingresar la contraseña';
        // }

        // if(!usuarioData.password2){
        //     password2Error = 'Debe repetir la contraseña';
        // }

        // if(usuarioData.password && usuarioData.password2){
        //     if(usuarioData.password !== usuarioData.password2){
        //         passwordError = 'Las contraseñas no coinciden';
        //         password2Error = 'Las contraseñas no coinciden';
        //     }
        // }
    
        if(nombreError || montopagadoError || detalleError || fechaError || reservacionError ){
            setClienteData({ ...clienteData, nombreError, montopagadoError, detalleError, fechaError, reservacionError});
            return false;
        }
        
        return true;
    }
}
    
    // const verificarLogin = () => {

    //     let nombreExiste = false;

    //     usuarios.forEach(usuario => {

    //         if(currentId !== usuario._id){

    //             if(usuario.login.toLowerCase().trim() === usuarioData.login.toLowerCase().trim()){
    //                 nombreExiste = true;
    //             }

    //         }
    //     });

    //     return nombreExiste;
    // }

    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'CLI-';

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

        clienteData.codigo = codigo;

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
    useEffect(() => { 
        if(cliente){
            setClienteData(cliente);
            setRadioValue(cliente.privilegio);
        } 
    }, [cliente]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                generarCodigoBitacora();
                dispatch(createConsecutivo(bitacoraConsecutivoData));
                bitacoraData.descripcion =  `Edición del cliente ${clienteData.codigo}`;
                dispatch(createBitacora(bitacoraData));
                dispatch(updateCliente(currentId, clienteData));
                setCurrenteId(null);
                dispatch(getClientes());
                clearForm();
                setshow(false);
            }else{

                generarCodigoBitacora();
                dispatch(createConsecutivo(bitacoraConsecutivoData));
                bitacoraData.descripcion =  `Creación del cliente ${clienteData.codigo}`;
                dispatch(createBitacora(bitacoraData));
                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setClienteData({ ...clienteData, id_consecutivo : tempIdConsecutivo});
                dispatch(createCliente(clienteData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }
    }
        
    const clearForm = () => {
        setCurrenteId(null);
        setRadioValue(null);
        setClienteData({
            codigo: '',
            nombre: '', 
            montopagado: '',
            detalle: '',
            fecha: '',
            reservacion: '',
            id_restaurante: '',
            nombreError: '', 
            montopagadoError: '',
            detalleError: '',
            fechaError: '',
            reservacionError: '',
            id_restauranteError: '',
        });
    }
    
    
    return(

        <Modal size="xl" show={isOpen} onHide={setshow} onExit={clearForm} className="modal" >
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Cliente' : 'Crear Cliente'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="7">
                            <h6 className="mb-4">Datos del Cliente</h6>
                            <Row>
                                <Col md="3"className="text-right pt-1">
                                    <Form.Label >Código</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl type="text" disabled name="codigo" value={!currentId ? generarCodigo() : clienteData.codigo}></FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Nombre</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (clienteData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={clienteData.nombre} onChange={(e) => setClienteData({ ...clienteData, nombre: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{clienteData.nombreError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Monto Pagado    </Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (clienteData.montopagadoError) ? 'is-invalid' : ''} type="text" name="montopagado" value={clienteData.montopagado} onChange={(e) => setClienteData({ ...clienteData, montopagado: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{clienteData.montopagadoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Detalle</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (clienteData.detalleError) ? 'is-invalid' : ''} type="text" name="detalle" value={clienteData.detalle} onChange={(e) => setClienteData({ ...clienteData, detalle: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{clienteData.detalleError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Fecha</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (clienteData.fechaError) ? 'is-invalid' : ''} type="number" name="fecha" value={clienteData.fecha} onChange={(e) => setClienteData({ ...clienteData, fecha: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{clienteData.fechaError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>
                            {/* <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Reservación</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (clienteData.reservacionError) ? 'is-invalid' : ''} type="number" name="reservacion" value={clienteData.reservacion} onChange={(e) => setClienteData({ ...clienteData, reservacion: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{clienteData.reservacionError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row >
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Restaurante</Form.Label>
                                </Col>
                                <Col className="float-left">
                                    <ButtonGroup toggle className="mb-1">
                                        {radios.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            type="radio"
                                            variant="secondary"
                                            name="radio"
                                            className= "border"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => {setRadioValue(e.currentTarget.value); setClienteData({ ...clienteData, restaurantes: e.target.value})}}
                                        >
                                            {radio.name}
                                        </ToggleButton>
                                        ))}
                                    </ButtonGroup>
                                    <small className="form-text text-danger">{clienteData.retauranteError}</small>
                                </Col>
                            </Row> */}

                    
                            {radioValue === "restaurante" &&
                                <Row className="mt-3">
                                    <Col md="3" className="text-right pt-1">
                                        <Form.Label>Restaurante</Form.Label>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Form.Control as="select" name="id_restaurante"  className={ (clienteData.id_restauranteError) ? 'is-invalid' : ''} value={clienteData.id_restaurante} onChange={(e) => setClienteData({ ...clienteData, id_restaurante: e.target.value})}>
                                                <option value="">--Seleccione--</option>
                                                {restaurantes.map((evento) => <option key={evento._id} value={evento._id}>{evento.nombre}</option>)}               
                                            </Form.Control>
                                            <small className="form-text text-danger">{clienteData.id_restauranteError}</small>
                                        </FormGroup>
                                    </Col>
                                </Row>

                            }                 
                            
                        </Col>

                        {/* <Col>
                            <h6 className="mb-4">Datos Técnicos del Usuario</h6>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Login</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (usuarioData.loginError) ? 'is-invalid' : ''} type="text" name="login" value={usuarioData.login} onChange={(e) => setUsuarioData({ ...usuarioData, login: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{usuarioData.loginError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Contraseña</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (usuarioData.passwordError) ? 'is-invalid' : ''} type="password" name="password" value={usuarioData.password} onChange={(e) => setUsuarioData({ ...usuarioData, password: e.target.value})} disabled={currentId ? !checkedEdit : false}></FormControl>
                                        <small className="form-text text-danger">{usuarioData.passwordError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right">
                                    <Form.Label>Repetir Contraseña</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (usuarioData.password2Error) ? 'is-invalid' : ''} type="password" name="password2" value={usuarioData.password2} onChange={(e) => setUsuarioData({ ...usuarioData, password2: e.target.value})} disabled={currentId ? !checkedEdit : false}></FormControl>
                                        <small className="form-text text-danger">{usuarioData.password2Error}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            {currentId &&
                                <Row>
                                <Col md="3">
                    
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Check type="checkbox" label="Cambio de Contraseña" name="" defaultChecked={checkedEdit} onChange={(e) => { setUsuarioData({ ...usuarioData, updatePassword: !checkedEdit}); setCheckedEdit(!checkedEdit)}}/>
                                    </FormGroup>
                                    
                                </Col>
                            </Row>
                            }

                            
                        </Col> */}
                        
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



export default ClienteForm;