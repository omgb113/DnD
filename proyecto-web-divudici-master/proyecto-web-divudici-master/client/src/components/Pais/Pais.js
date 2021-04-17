import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaisForm from '../PaisForm/PaisForm';
import PaisData from '../PaisData/PaisData';
import { getConsecutivos } from '../../actions/consecutivos';
import { getPaises } from '../../actions/paises';
import { Link } from 'react-router-dom';


// import './styles.css';
import { Button, Row, Col, FormControl, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes,  faSync, faPlus, faEraser, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';


const Pais = () => {

    const [currentId, setCurrenteId] = useState(null);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const [inputSearchTerm, setinputSearchTerm] = useState('');
    const [selectedTypeSearch, setSelectedTypeSearch] = useState('');
    const [inputSearchTermError, setinputSearchTermError] = useState('');
    const [currentConsecutivo, setCurrentConsecutivo] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [bitacoraData, setBitacoraData] = useState({
        codigo: '',
        id_usuario: user.result._id, 
        descripcion: ''
    });

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
        dispatch(getPaises());
    }, [ currentId, currentConsecutivo, dispatch ]);
    
    const [bitacoraConsecutivoData, setBitacoraConsecutivoData] = useState({
        tipo: 'Bitácora', 
        descripcion: 'Bitácora creada automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const consecutivos = useSelector((state) => state.consecutivos);

    const generarCodigoBitacora = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'BIT-';

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
            bitacoraConsecutivoData.valor= 1;
            bitacoraConsecutivoData.prefijo = prefix;
            
            codigo = prefix;
        }else{

            codigo = prefix + valorMayor;

            bitacoraConsecutivoData.valor= valorMayor++;
            bitacoraConsecutivoData.prefijo = prefix;
        }

        bitacoraData.codigo = codigo;

        return codigo;
    }

    return (
        <>
            <Row>
                <Col md="12">
                    <div className="heading mt-4 mb-4">
                        <h2 className="d-inline mt-4" >Países</h2>
                        <button className="float-right">
                            <Link to={location => ({ ...location, pathname: "/seguridad" })} >
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
                    <FontAwesomeIcon icon={faGlobeAmericas} size="9x" className="text-white mt-5"/>
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
                            
                            <PaisData setShow={setShow} currentId={currentId} setCurrenteId={setCurrenteId} inputSearchTerm={inputSearchTerm} selectedTypeSearch={selectedTypeSearch} bitacoraData={bitacoraData} setBitacoraData={setBitacoraData} generarCodigoBitacora={generarCodigoBitacora} bitacoraConsecutivoData={bitacoraConsecutivoData}/>
                            
                        </div>
                        </Row>
                        
                        
                    </div>
                </Col>
            </Row>

            <PaisForm currentId={currentId} setCurrenteId={setCurrenteId} isOpen={show} setshow={setShow} onExit={reload} currentConsecutivo={currentConsecutivo} setCurrentConsecutivo={setCurrentConsecutivo} bitacoraData={bitacoraData} setBitacoraData={setBitacoraData} generarCodigoBitacora={generarCodigoBitacora} bitacoraConsecutivoData={bitacoraConsecutivoData} />
        </>
    );
}

export default Pais;


