import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Restaurante from '../../components/Restaurante/Restaurante';
import { Button, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faIdCard, faUserTag, faTruckMoving, faTools, faFile } from '@fortawesome/free-solid-svg-icons';
import BuffetLogo from '../../images/buffet.svg';
import TableLogo from '../../images/table.svg';
import CheftLogo from '../../images/chef.svg';



const Administracion = ({currentId, setCurrenteId, isOpen, setshow, onExit}) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


    return(
        
        <Row className="home mt-5">
            <Col md="12" >
            <h2 className="text-center text-white mt-4 ">Administración</h2>
            </Col>

            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

                <Col md="4" className="text-center pt-5">
                    <Link to={location => ({ ...location, pathname: "/especiales" })} >
                        <button>
                            <img src={BuffetLogo} alt="Especialidad logo" width="210px" ></img>
                            <p className="mt-2 text-white h4">Especiales</p>
                        </button>
                    </Link>
                </Col>
                
            }
            
            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

                <Col md="4" className="text-center pt-5">
                    <Link to={location => ({ ...location, pathname: "/mesas" })} >
                        <button>
                            <img src={TableLogo} alt="Mesa logo" width="215px" ></img>
                            <p className="mt-2 text-white h4">Mesas</p>
                        </button>
                    </Link>
                </Col>
                
            }

            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

            <Col md="4" className="text-center pt-5">
                <Link to={location => ({ ...location, pathname: "/empleados" })} >
                    <button>
                        <FontAwesomeIcon icon={faIdCard} size="9x" className="text-white"/>
                        <p className="mt-2 text-white h4">Empleados</p>
                    </button>
                </Link>
            </Col>

            }

            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

            <Col md="4" className="text-center pt-5 pb-4">
                <Link to={location => ({ ...location, pathname: "/puestos" })} >
                    <button>
                         <img src={CheftLogo} alt="Chef logo" width="180px" ></img>
                        <p className="mt-2 text-white h4">Puestos</p>
                    </button>
                </Link>
            </Col>

            }

        </Row>
    )
};

export default Administracion;