import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Restaurante from '../../components/Restaurante/Restaurante';
import { Button, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faUserTag, faTruckMoving, faTools, faFile, faStore, faCashRegister } from '@fortawesome/free-solid-svg-icons';

import './styles.css';


const Home = ({currentId, setCurrenteId, isOpen, setshow, onExit}) => {

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
            <h2 className="text-center text-white mt-4 ">Administración Central de los Restaurantes</h2>
            </Col>

            {(user.result.privilegio === "seguridad" || user.result.privilegio === "cuenta") && 

                <Col md="4" className="text-center pt-5">
                    <Link to={location => ({ ...location, pathname: "/seguridad" })} >
                        <button>
                            <FontAwesomeIcon icon={faUserShield} size="9x" className="text-white"/>
                            <p className="mt-2 text-white h4">Seguridad</p>
                        </button>
                    </Link>
                </Col>
                
            }
            
            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

                <Col md="4" className="text-center pt-5">
                    <Link to={location => ({ ...location, pathname: "/restaurantes" })} >
                        <button>
                            <FontAwesomeIcon icon={faStore} size="9x" className="text-white"/>
                            <p className="mt-2 text-white h4">Restaurantes</p>
                        </button>
                    </Link>
                </Col>
                
            }

            {(user.result.privilegio === "sistema" ) && 
                <Col md="4" className="text-center pt-5">
                    <button>
                        <FontAwesomeIcon icon={faUserTag} size="9x" className="text-white"/>
                        <p className="mt-2 text-white h4">Clientes</p>
                    </button>
                    {/* <Link to="" className="btn-restaurant">Seguridad</Link> */}
                </Col>
            }

            
            {(user.result.privilegio === "sistema" || user.result.privilegio === "administrador") && 
                <Col md="4" className="text-center p-5">
                    <Link to={location => ({ ...location, pathname: "/proveedores" })} >
                        <button component={Link} to="">
                            <FontAwesomeIcon icon={faTruckMoving} size="9x" className="text-white"/>
                            <p className="mt-2 text-white h4">Proveedores</p>
                        </button>
                    </Link>
                </Col>
            }

            {(user.result.privilegio === "sistema" ) && 
                <Col md="4" className="text-center p-5">
                    <Link to={location => ({ ...location, pathname: "/administracion" })}>
                        <button >
                            <FontAwesomeIcon icon={faTools} size="9x" className="text-white"/>
                            <p className="mt-2 text-white h4">Administración</p>
                        </button>
                    </Link>
                </Col>
            }

            {(user.result.privilegio === "sistema" || user.result.privilegio === "seguridad") && 
                <Col md="4" className="text-center p-5">
                    <button>
                        <Link to={location => ({ ...location, pathname: "/bitacoras" })}>
                            <FontAwesomeIcon icon={faFile} size="9x" className="text-white"/>
                            <p className="mt-2 text-white h4">Reportes</p>
                        </Link>
                    </button>
                </Col>
            }

            
        {(user.result.privilegio === "restaurante") && 
                <Col md="12" className="text-center p-5">
                    <button component={Link} to="">
                        <Link to={location => ({ ...location, pathname: "/restauranteHome" })}>
                            <FontAwesomeIcon icon={faCashRegister} size="9x" className="text-white"/>
                            <p className="mt-2 text-white h4">Cajas</p>
                        </Link>
                    </button>
                </Col>
            }

        </Row>
    )
};

export default Home;