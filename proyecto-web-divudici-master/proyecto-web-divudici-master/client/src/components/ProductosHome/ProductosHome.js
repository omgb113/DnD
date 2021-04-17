import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Restaurante from '../../components/Restaurante/Restaurante';
import { Button, Row, Col, Form, FormControl, Navbar, Nav, NavDropdown, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish, faUtensilSpoon, faRecycle, faLaptop, faBroom } from '@fortawesome/free-solid-svg-icons';


const ProductosHome = ({currentId, setCurrenteId, isOpen, setshow, onExit}) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


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


    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            
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
        
        <Row className="home mt-5">
            <Col md="12" >
            <h2 className="text-center text-white mt-4 ">Productos</h2>
            </Col>

            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

                <Col md="4" className="text-center pt-5">
                    <Link to={location => ({ ...location, pathname: "/comestibles" })} >
                    <button>
                        <FontAwesomeIcon icon={faFish} size="9x" className="text-white"/>
                        <p className="mt-2 text-white h4">Comestibles</p>
                    </button>
                    </Link>
                </Col>
            }

            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

                <Col md="4" className="text-center pt-5">
                    <Link to={location => ({ ...location, pathname: "/desechables" })} >
                    <button>
                        <FontAwesomeIcon icon={faRecycle} size="9x" className="text-white"/>
                        <p className="mt-2 text-white h4">Desechables y Empaques</p>
                    </button>
                    </Link>
                </Col>
            }

            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

                <Col md="4" className="text-center pt-5">
                    <Link to={location => ({ ...location, pathname: "/limpieza" })} >
                    <button>
                        <FontAwesomeIcon icon={faBroom} size="9x" className="text-white"/>
                        <p className="mt-2 text-white h4">Limpieza e Higiene</p>
                    </button>
                    </Link>
                </Col>
            }
            
            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

                <Col md="4" className="text-center pt-5">
                    <Link to={location => ({ ...location, pathname: "/tecnologia" })} >
                    <button>
                        <FontAwesomeIcon icon={faLaptop} size="9x" className="text-white"/>
                        <p className="mt-2 text-white h4">Tecnología</p>
                    </button>
                    </Link>
                </Col>
            }
            
            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

                <Col md="4" className="text-center pt-5 pb-5">
                    <Link to={location => ({ ...location, pathname: "/utencilios" })} >
                    <button>
                        <FontAwesomeIcon icon={faUtensilSpoon} size="9x" className="text-white"/>
                        <p className="mt-2 text-white h4">Equipos y Utencilios</p>
                    </button>
                    </Link>
                </Col>
            }
            
        </Row>
    )
};

export default ProductosHome;