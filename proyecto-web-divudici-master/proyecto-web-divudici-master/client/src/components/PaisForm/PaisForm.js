import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import './styles.css';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup,  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, createConsecutivo, updateConsecutivo } from '../../actions/consecutivos';
import { createPais, updatePais, getPaises } from '../../actions/paises';
import FileBase from 'react-file-base64';
import { createBitacora } from '../../actions/bitacoras';


const PaisFrom = ({currentId, setCurrenteId, isOpen, setshow, bitacoraData, generarCodigoBitacora, bitacoraConsecutivoData}) => {

    const dispatch = useDispatch();
    const pais = useSelector((state) => currentId ? state.paises.find((r) => r._id === currentId) : null);
    const consecutivos = useSelector((state) => state.consecutivos);
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Países', 
        descripcion: 'País creado automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const [paisData, setPaisData] = useState({
        id_consecutivo: '',
        codigo: '', 
        nombre: '', 
        bandera: '', 
        nombreError: '', 
        banderaError: ''
    
    });


    const validate = () => {

        let nombreError ='';
        let banderaError = '';

        if(!paisData.nombre){
            nombreError = 'Debe ingresar un nombre para el país';
        }

        if(!paisData.bandera){
            banderaError = 'Debe subir una foto de la bandera del país';
        }

        if(nombreError || banderaError ){
            setPaisData({ ...paisData, nombreError, banderaError });
            return false;
        }

        
        return true;

    }

    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'P-';

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

        paisData.codigo = codigo;

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
    useEffect(() => { if(pais){setPaisData(pais)} 
    }, [pais]);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                generarCodigoBitacora();
                dispatch(createConsecutivo(bitacoraConsecutivoData));
                bitacoraData.descripcion =  `Edición del país ${paisData.codigo}`;
                dispatch(createBitacora(bitacoraData));
                dispatch(updatePais(currentId, paisData));
                setCurrenteId(null);
                dispatch(getPaises());
                clearForm();
                setshow(false);
            }else{
                generarCodigoBitacora();
                dispatch(createConsecutivo(bitacoraConsecutivoData));
                bitacoraData.descripcion =  `Creación del país ${paisData.codigo}`;
                dispatch(createBitacora(bitacoraData));
                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setPaisData({ ...paisData, id_consecutivo : tempIdConsecutivo});
                dispatch(createPais(paisData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }

    }
        

    const clearForm = () => {
        setCurrenteId(null);
        setPaisData({nombre: '', bandera: ''});
    }

    console.table(paisData)
    
    
    return(

        <Modal show={isOpen} onHide={setshow}  onExit={clearForm} className="modal">
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar País' : 'Crear País'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="3"className="text-right pt-1">
                            <Form.Label >Código</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl type="text" disabled name="codigo" value={!currentId ? generarCodigo() : paisData.codigo} ></FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Nombre</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (paisData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={paisData.nombre} onChange={(e) => setPaisData({ ...paisData, nombre: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{paisData.nombreError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Bandera del País</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FileBase className={ (paisData.banderaError) ? 'is-invalid' : ''} type="file" multiple={false} name="bandera" value={paisData.bandera} onDone={({base64}) => setPaisData({ ...paisData, bandera: base64})}></FileBase>
                                <small className="form-text text-danger">{paisData.banderaError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            
                        </Col>
                        <Col>
                            <FormGroup>
                                <img className="img-fluid pr-5 pl-5" src={paisData.bandera}/>
                            </FormGroup>
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

export default PaisFrom;