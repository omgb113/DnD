import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import BebidaHeladaForm from '../BebidaHeladaForm/BebidaHeladaForm';
import BebidaHeladaData from '../BebidaHeladaData/BebidaHeladaData';
import { getConsecutivos } from '../../actions/consecutivos';
import { getBebidas } from '../../actions/bebidas';
import { getRestaurantes } from '../../actions/restaurantes';
import { Link } from 'react-router-dom';


import { Button, Row, Col, FormControl, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes,  faSync, faPlus, faEraser, faGlassWhiskey } from '@fortawesome/free-solid-svg-icons';



const BebidaHelada = () => {

    const [currentId, setCurrenteId] = useState(null);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const [inputSearchTerm, setinputSearchTerm] = useState('');
    const [selectedTypeSearch, setSelectedTypeSearch] = useState('');
    const [inputSearchTermError, setinputSearchTermError] = useState('');
    const [currentConsecutivo, setCurrentConsecutivo] = useState(null);

    const selectedConsecutivo = useSelector((state) => !currentConsecutivo ? state.consecutivos.find((c) => c.prefijo === "BH-") : null);

    const reload=()=>{window.location.reload()};

    const search = (e) => {

        e.preventDefault();
        
        let inputSearchTermError = '';

        if(!inputSearchTerm ){

            inputSearchTermError = 'Debe ingresar un parámetro de búsqueda';
        }

        if(!selectedTypeSearch ){

            inputSearchTermError = 'Debe ingresar el tipo de búsqueda';
        }

        if(inputSearchTermError){

            setinputSearchTermError(inputSearchTermError);

        }else{
            setinputSearchTermError(inputSearchTermError);
            setinputSearchTerm(inputSearchTermError);
            setSelectedTypeSearch(selectedTypeSearch);
        }
    }

    const clearForm = () => {
        
        setinputSearchTermError('');
        setinputSearchTerm('');
        setSelectedTypeSearch('');
    }   
    
    useEffect(() => {
        dispatch(getConsecutivos());
        dispatch(getRestaurantes());
        dispatch(getBebidas());
    }, [ currentId, currentConsecutivo, dispatch ]);


    return (
        <>
            <Row>
                <Col md="12">
                    <div className="heading mt-4 mb-4">
                        <h2 className="d-inline mt-4" >Bebidas Heladas</h2>
                        <button className="float-right">
                            <Link to={location => ({ ...location, pathname: "/bebidas" })} >
                                <FontAwesomeIcon icon={faTimes} size="2x" className="text-white"/>
                            </Link> 
                        </button>
                        <button className="float-right" onClick={reload}>
                            <FontAwesomeIcon icon={faSync} size="2x" className="text-white"/>
                        </button>
                    </div>
                    

                </Col>  
                <Col md="3">
                    <div className="sidebar text-center">
                    <FontAwesomeIcon icon={faGlassWhiskey} size="9x" className="text-white mt-5"/>
                    </div>
                </Col>
                <Col md="9">
                    <div className="content">
                        <Form autoComplete="off" noValidate onSubmit={search}>
                            <Row className="mb-4 mt-4">
                                
                                <Col md="8" className="pl-0" >

                                    <InputGroup >
                                        <InputGroup.Prepend>
                                            <select className="form-control" id="input-dropdown-search"  searchable="Search here.." value={selectedTypeSearch} onChange={(e) => {setSelectedTypeSearch(e.target.value)}}>
                                                <option value="" disabled >Buscar...</option>
                                                <option value="codigo">Código</option>
                                                <option value="nombre">Nombre</option>
                                            </select>
                                        </InputGroup.Prepend>
                                        
                                        <FormControl  aria-describedby="basic-addon1" id="inputSearch" value={inputSearchTerm} onChange={(e) => {setinputSearchTerm(e.target.value)}} />
                                        <InputGroup.Append>
                                            <Button type="submit" variant="outline-light" id="searchButton"><FontAwesomeIcon icon={faSearch} /></Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <small className="form-text text-danger ml-2">{inputSearchTermError}</small>
                                </Col>
                                <Col md="4">
                                    <Button variant="outline-light" className="btn-restaurant" onClick={clearForm} ><FontAwesomeIcon icon={faEraser} /></Button>
                                    <Button variant="outline-light" className="ml-3 btn-restaurant" onClick={() => setShow(true)} ><FontAwesomeIcon icon={faPlus} /></Button>
                                    
                                </Col>
                                
                            </Row>
                        </Form>
                        
                        <Row>
                        <div className="table-wrapper">
                            
                            <BebidaHeladaData setShow={setShow} currentId={currentId} setCurrenteId={setCurrenteId} inputSearchTerm={inputSearchTerm} selectedTypeSearch={selectedTypeSearch} />
                            
                        </div>
                        </Row>
                        
                        
                    </div>
                </Col>
            </Row>

            <BebidaHeladaForm currentId={currentId} setCurrenteId={setCurrenteId} isOpen={show} setshow={setShow}  currentConsecutivo={currentConsecutivo} setCurrentConsecutivo={setCurrentConsecutivo} selectedConsecutivo={selectedConsecutivo}/>
        </>
    );
}

export default BebidaHelada;


