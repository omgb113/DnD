import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, createConsecutivo } from '../../actions/consecutivos';
import { createBitacora } from '../../actions/bitacoras';
import { createUsuario, getUsuarios, updateUsuario } from '../../actions/usuarios';

const UsuarioForm = ({currentId, setCurrenteId, isOpen, setshow, bitacoraData, generarCodigoBitacora, bitacoraConsecutivoData}) => {

    const dispatch = useDispatch();
    const restaurantes = useSelector((state) => state.restaurantes);
    const usuarios = useSelector((state) => state.usuarios);
    const consecutivos = useSelector((state) => state.consecutivos);
    const [checkedEdit, setCheckedEdit] = useState(false);
    const [radioValue, setRadioValue] = useState(null);
    const radios = [
        { name: 'Sistema', value: 'sistema' },
        { name: 'Restaurante', value: 'restaurante' },
        { name: 'Seguridad', value: 'seguridad' },
        { name: 'Cuenta', value: 'cuenta' }
    ];
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");
    
    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Usuarios', 
        descripcion: 'Usuario creado automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const usuario = useSelector((state) => currentId ? state.usuarios.find((b) => b._id === currentId) : null);
    const [usuarioData, setUsuarioData] = useState({
        id_consecutivo: '',
        codigo: '',
        nombre: '', 
        primerApellido: '',
        segundoApellido: '',
        telefonoFijo: '',
        telefonoCelular: '',
        privilegio: '',
        id_restaurante: '',
        login: '',
        password: '',
        password2: '',
        updatePassword: checkedEdit,
        nombreError: '', 
        primerApellidoError: '',
        segundoApellidoError: '',
        telefonoFijoError: '',
        telefonoCelularError: '',
        privilegioError: '',
        id_restauranteError: '',
        loginError: '',
        passwordError: '',
        password2Error: '',
    });

    const validate = () => {

        let nombreError = '';
        let primerApellidoError = '';
        let segundoApellidoError = '';
        let telefonoFijoError = '';
        let telefonoCelularError = '';
        let privilegioError = '';
        let id_restauranteError = '';
        let loginError = '';
        let passwordError = '';
        let password2Error = '';


        if(!usuarioData.nombre){
            nombreError = 'Debe ingresar el nombre del usuario';
        }

        if(!usuarioData.primerApellido){
            primerApellidoError = 'Debe ingresar el primer apellido del usuario';
        }

        if(!usuarioData.segundoApellido){
            segundoApellidoError = 'Debe ingresar el segundo apellido del usuario';
        }

        if(!usuarioData.telefonoFijo){
            telefonoFijoError = 'Debe ingresar el teléfono fijo del usuario';
        }else if(usuarioData.telefonoFijo < 0){
            telefonoFijoError = 'No se permiten números negativos';
        }

        if(!usuarioData.telefonoCelular){
            telefonoCelularError = 'Debe ingresar el teléfono celular del usuario';
        }else if(usuarioData.telefonoFijo < 0){
            telefonoCelularError = 'No se permiten números negativos';
        }

        if(!radioValue){
            privilegioError = 'Debe seleccionar un privilegio para el usuario';
        }else if(radioValue){

            if(radioValue === 'restaurante'){
                if(!usuarioData.id_restaurante){
                    id_restauranteError = 'Debe seleccionar un restaurante';
                }
            }else{

                usuarioData.id_restaurante = '604b84b824543a4dfcce467f';
            }
        }

        if(!usuarioData.login){
            loginError = 'Debe ingresar el login del usuario';
        }else if(verificarLogin()){
            loginError = 'El login no esta disponible';
        }

        if(!usuarioData.password){
            passwordError = 'Debe ingresar la contraseña';
        }

        if(!usuarioData.password2){
            password2Error = 'Debe repetir la contraseña';
        }

        if(usuarioData.password && usuarioData.password2){
            if(usuarioData.password !== usuarioData.password2){
                passwordError = 'Las contraseñas no coinciden';
                password2Error = 'Las contraseñas no coinciden';
            }
        }
    
        if(nombreError || primerApellidoError || segundoApellidoError || telefonoFijoError || telefonoCelularError || privilegioError || id_restauranteError || loginError || passwordError || password2Error ){
            setUsuarioData({ ...usuarioData, nombreError, primerApellidoError, segundoApellidoError, telefonoFijoError, telefonoCelularError, privilegioError, id_restauranteError, loginError, passwordError, password2Error});
            return false;
        }
        
        return true;
    }
    
    const verificarLogin = () => {

        let nombreExiste = false;

        usuarios.forEach(usuario => {

            if(currentId !== usuario._id){

                if(usuario.login.toLowerCase().trim() === usuarioData.login.toLowerCase().trim()){
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
        let prefix = 'USU-';

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

        usuarioData.codigo = codigo;

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
        if(usuario){
            setUsuarioData(usuario);
            setRadioValue(usuario.privilegio);
        } 
    }, [usuario]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                generarCodigoBitacora();
                dispatch(createConsecutivo(bitacoraConsecutivoData));
                bitacoraData.descripcion =  `Edición del usuario ${usuarioData.codigo}`;
                dispatch(createBitacora(bitacoraData));
                dispatch(updateUsuario(currentId, usuarioData));
                setCurrenteId(null);
                dispatch(getUsuarios());
                clearForm();
                setshow(false);
            }else{

                generarCodigoBitacora();
                dispatch(createConsecutivo(bitacoraConsecutivoData));
                bitacoraData.descripcion =  `Creación del usuario ${usuarioData.codigo}`;
                dispatch(createBitacora(bitacoraData));
                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setUsuarioData({ ...usuarioData, id_consecutivo : tempIdConsecutivo});
                dispatch(createUsuario(usuarioData));
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
        setUsuarioData({
            nombre: '', 
            primerApellido: '',
            segundoApellido: '',
            telefonoFijo: '',
            telefonoCelular: '',
            privilegio: '',
            id_restaurante: '',
            login: '',
            password: '',
            password2: '',
            nombreError: '', 
            primerApellidoError: '',
            segundoApellidoError: '',
            telefonoFijoError: '',
            telefonoCelularError: '',
            privilegioError: '',
            id_restauranteError: '',
            loginError: '',
            passwordError: '',
            password2Error: ''
        });
    }
    
    
    return(

        <Modal size="xl" show={isOpen} onHide={setshow} onExit={clearForm} className="modal" >
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Usuario' : 'Crear Usuario'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="7">
                            <h6 className="mb-4">Datos Personales del Usuario</h6>
                            <Row>
                                <Col md="3"className="text-right pt-1">
                                    <Form.Label >Código</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl type="text" disabled name="codigo" value={!currentId ? generarCodigo() : usuarioData.codigo}></FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Nombre</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (usuarioData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={usuarioData.nombre} onChange={(e) => setUsuarioData({ ...usuarioData, nombre: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{usuarioData.nombreError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Primer Apellido</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (usuarioData.primerApellidoError) ? 'is-invalid' : ''} type="text" name="primerApellido" value={usuarioData.primerApellido} onChange={(e) => setUsuarioData({ ...usuarioData, primerApellido: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{usuarioData.primerApellidoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Segundo Apellido</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (usuarioData.segundoApellidoError) ? 'is-invalid' : ''} type="text" name="segundoApellido" value={usuarioData.segundoApellido} onChange={(e) => setUsuarioData({ ...usuarioData, segundoApellido: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{usuarioData.segundoApellidoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Teléfono Fijo</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (usuarioData.telefonoFijoError) ? 'is-invalid' : ''} type="number" name="telefonoFijo" value={usuarioData.telefonoFijo} onChange={(e) => setUsuarioData({ ...usuarioData, telefonoFijo: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{usuarioData.telefonoFijoError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Teléfono Celular</Form.Label>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <FormControl className={ (usuarioData.telefonoCelularError) ? 'is-invalid' : ''} type="number" name="telefonoCelular" value={usuarioData.telefonoCelular} onChange={(e) => setUsuarioData({ ...usuarioData, telefonoCelular: e.target.value})}></FormControl>
                                        <small className="form-text text-danger">{usuarioData.telefonoCelularError}</small>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row >
                                <Col md="3" className="text-right pt-1">
                                    <Form.Label>Privilegio</Form.Label>
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
                                            onChange={(e) => {setRadioValue(e.currentTarget.value); setUsuarioData({ ...usuarioData, privilegio: e.target.value})}}
                                        >
                                            {radio.name}
                                        </ToggleButton>
                                        ))}
                                    </ButtonGroup>
                                    <small className="form-text text-danger">{usuarioData.privilegioError}</small>
                                </Col>
                            </Row>

                    
                            {radioValue === "restaurante" &&
                                <Row className="mt-3">
                                    <Col md="3" className="text-right pt-1">
                                        <Form.Label>Restaurante</Form.Label>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Form.Control as="select" name="id_restaurante"  className={ (usuarioData.id_restauranteError) ? 'is-invalid' : ''} value={usuarioData.id_restaurante} onChange={(e) => setUsuarioData({ ...usuarioData, id_restaurante: e.target.value})}>
                                                <option value="">--Seleccione--</option>
                                                {restaurantes.map((evento) => <option key={evento._id} value={evento._id}>{evento.nombre}</option>)}               
                                            </Form.Control>
                                            <small className="form-text text-danger">{usuarioData.id_restauranteError}</small>
                                        </FormGroup>
                                    </Col>
                                </Row>

                            }                 
                            
                        </Col>

                        <Col>
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

export default UsuarioForm;