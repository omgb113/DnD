import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  useHistory, useLocation } from 'react-router-dom';
import { Button, Row, Col, Form, FormControl, Navbar, Nav, NavDropdown, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';


import './styles.css';


const UpperNav = ({currentId, setCurrenteId, isOpen, setshow, onExit}) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();
    const history = useHistory();

    const dispatch = useDispatch();
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


    const logout  = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/');

        setUser(null);

    }

    useEffect(() => {
    
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);
    
        

    const clearForm = () => {

        setUsuarioData({
            login: '', 
            password: '', 
            loginError: '', 
            passwordError: ''
        });
    }
    
    return(
        
        <Navbar variant="dark" expand="lg" sticky="top" className="navbar-restaurant">
        
        <Link to={location => ({ ...location, pathname: "/home" })} >
            <Navbar.Brand href="#home" className="text-white">
        
                <FontAwesomeIcon icon={faStore}  className="text-white mr-2"/>
                Divudici
            
            </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            
            {user ? (
                <Nav className="mr-auto">
                    <NavDropdown title="Sistema" id="basic-nav-dropdown" className="text-white">
                    <NavDropdown.Item href="#action/3.1">Información</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Reiniciar Sesión</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="" onClick={logout}>Salir</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Ayuda" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Sistema</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Seguridad</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Restaurante</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                
            ): (
                <></>
            )}
            

            {user ? (
                <>
                    <p className="mr-5 align-middle mt-1 mb-1">{`Bienvenido(a) ${user.result.nombre} ${user.result.primerApellido}`}</p>
                    <Button variant="outline-outline-light" className="btn-restaurant" onClick={logout} >Cerrar Sesión</Button>
                </>
            ) : (

                <div>

                </div>
            )}

        </Navbar.Collapse>
        </Navbar>
    )
};

export default UpperNav;