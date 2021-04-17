import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Restaurante from '../../components/Restaurante/Restaurante';
import { Button, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faUserTag, faTruckMoving, faCocktail } from '@fortawesome/free-solid-svg-icons';
import BuffetLogo from '../../images/buffet.svg';



const EspecialHome = ({currentId, setCurrenteId, isOpen, setshow, onExit}) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


    return(
        
        <Row className="home mt-5">
            <Col md="12" >
            <h2 className="text-center text-white mt-4 ">Especialidades</h2>
            </Col>

            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

            <Col md="4" className="text-center pt-5">
                <Link to={location => ({ ...location, pathname: "/buffets" })} >
                    <button>
                        <FontAwesomeIcon icon={faUtensils} size="9x" className="text-white"/>
                        <p className="mt-2 text-white h4">Buffet</p>
                    </button>
                </Link>
            </Col>

            }

            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

            <Col md="4" className="text-center pt-5 pb-5">
                <Link to={location => ({ ...location, pathname: "/bebidas" })} >
                    <button>
                        <FontAwesomeIcon icon={faCocktail} size="9x" className="text-white"/>
                        <p className="mt-2 text-white h4">Bebidas</p>
                    </button>
                </Link>
            </Col>

            }

            {(user.result.privilegio === "sistema" || user.result.privilegio === "cuenta") && 

            <Col md="4" className="text-center pt-5">
                <Link to={location => ({ ...location, pathname: "/especialidades" })} >
                    <button>
                        <img src={BuffetLogo} alt="Especialidad logo" width="210px" ></img>
                        <p className="mt-2 text-white h4">Especialidades</p>
                    </button>
                </Link>
            </Col>

            }

        </Row>
    )
};

export default EspecialHome;