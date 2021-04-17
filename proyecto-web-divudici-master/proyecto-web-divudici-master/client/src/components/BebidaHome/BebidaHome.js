import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Restaurante from '../../components/Restaurante/Restaurante';
import { Button, Row, Col, Form, FormControl, Navbar, Nav, NavDropdown, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot, faWineBottle, faGlassWhiskey, faWineGlassAlt } from '@fortawesome/free-solid-svg-icons';
import CanLogo from '../../images/can.svg';


const BebidaHome = ({currentId, setCurrenteId, isOpen, setshow, onExit}) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    return(
        
        <Row className="home mt-5">
            <Col md="12" >
            <h2 className="text-center text-white mt-4 ">Bebidas</h2>
            </Col>

            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

                <Col md="4" className="text-center pt-5">
                    <Link to={location => ({ ...location, pathname: "/calientes" })} >
                    <button>
                        <FontAwesomeIcon icon={faMugHot} size="9x" className="text-white"/>
                        <p className="mt-2 text-white h4">Calientes</p>
                    </button>
                    </Link>
                </Col>
            }

            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

                <Col md="4" className="text-center pt-5">
                    <Link to={location => ({ ...location, pathname: "/heladas" })} >
                    <button>
                        <FontAwesomeIcon icon={faGlassWhiskey} size="9x" className="text-white"/>
                        <p className="mt-2 text-white h4">Heladas</p>
                    </button>
                    </Link>
                </Col>
            }

            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

                <Col md="4" className="text-center pt-5">
                    <Link to={location => ({ ...location, pathname: "/vinos" })} >
                    <button>
                        <FontAwesomeIcon icon={faWineGlassAlt} size="9x" className="text-white"/>
                        <p className="mt-2 text-white h4">Vinos</p>
                    </button>
                    </Link>
                </Col>
            }
            
            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

                <Col md="4" className="text-center pt-5">
                    <Link to={location => ({ ...location, pathname: "/gaseosas" })} >
                    <button>
                        <img src={CanLogo} alt="Can logo" width="90px" className=""></img>
                        <p className="mt-2 text-white h4">Gaseosas</p>
                    </button>
                    </Link>
                </Col>
            }
            
            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

                <Col md="4" className="text-center pt-5 pb-5">
                    <Link to={location => ({ ...location, pathname: "/licores" })} >
                    <button>
                        <FontAwesomeIcon icon={faWineBottle} size="9x" className="text-white"/>
                        <p className="mt-2 text-white h4">Licores</p>
                    </button>
                    </Link>
                </Col>
            }
            
        </Row>
    )
};

export default BebidaHome;