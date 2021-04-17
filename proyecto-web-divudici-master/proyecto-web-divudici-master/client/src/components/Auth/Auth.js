import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../actions/auth';
import { Button, Row, Col, Form, FormControl, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './styles.css'



const Auth = ({currentId, setCurrenteId, isOpen, setshow, onExit}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [usuarioData, setUsuarioData] = useState({
        login: '', 
        password: '', 
        loginError: '', 
        passwordError: '', 
    
    });

    const validate = () => {

        let loginError = '';
        let passwordError = ''; 

        if(!usuarioData.login){
            loginError = 'Debe Ingresar el usuario';
        }

        if(!usuarioData.password){
            passwordError = 'Debe ingresar la contraseña';
        }

        
        if(loginError || passwordError){
            setUsuarioData({ ...usuarioData, loginError, passwordError});
            return false;
        }        
        return true;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            
            console.log(usuarioData);

            dispatch(login(usuarioData, history));
        }

    }
        

    const clearForm = () => {

        setUsuarioData({
            login: '', 
            password: '', 
            loginError: '', 
            passwordError: ''
        });
    }
    
    return(
        <Row className="login">
            <Col md="6" className="login-restaurant-bg align-self-center">

            </Col>

            <Col md="6" className="login-bg align-self-center">

                <h1 className="display-4 text-center mt-5">Iniciar Sesión</h1>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 

                    <Form.Label className="col-8 offset-2 mt-5">Usuario</Form.Label>

                    <FormGroup className="col-8 offset-2">
                        <FormControl className={ (usuarioData.loginError) ? 'is-invalid' : ''} type="text" name="login" value={usuarioData.login} onChange={(e) => setUsuarioData({ ...usuarioData, login: e.target.value})}></FormControl>
                        <small className="form-text text-danger">{usuarioData.loginError}</small>
                    </FormGroup>

                    <Form.Label className="col-8 offset-2" >Contraseña</Form.Label>
                    <FormGroup className="col-8 offset-2">
                        <FormControl className={ (usuarioData.passwordError) ? 'is-invalid' : ''} type="password" name="password" value={usuarioData.password} onChange={(e) => setUsuarioData({ ...usuarioData, password: e.target.value})}></FormControl>
                        <small className="form-text text-danger">{usuarioData.passwordError}</small>
                    </FormGroup>      
                    
                    
                    <Row className="float-right mt-3">
                        <Col>
                            <Button className="mr-2 btn-restaurant" variant="outline-light" onClick={ clearForm } >
                                <FontAwesomeIcon icon={faEraser} size="2x"></FontAwesomeIcon>
                            </Button>
                            <Button className="mr-3 btn-restaurant" variant="outline-light" type="submit">
                                <FontAwesomeIcon icon={faSignInAlt} size="2x"></FontAwesomeIcon>
                            </Button>
                        </Col>
                        
                    </Row>
                </Form>
            </Col>
        </Row>
    )
};

export default Auth;