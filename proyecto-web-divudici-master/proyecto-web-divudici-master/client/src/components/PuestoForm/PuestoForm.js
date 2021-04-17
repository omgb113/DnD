import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, updateConsecutivo, createConsecutivo } from '../../actions/consecutivos';
import { createPuesto, getPuestos, updatePuesto } from '../../actions/puestos';

const PuestoForm = ({currentId, setCurrenteId, isOpen, setshow, currentConsecutivo, setCurrentConsecutivo, selectedConsecutivo}) => {

    const dispatch = useDispatch();
    const eventos = useSelector((state) => state.eventos);
    const consecutivos = useSelector((state) => state.consecutivos);
    const [checked, setChecked] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [radioValue, setRadioValue] = useState(null);
    const radios = [
        { name: 'Interno al Restaurante', value: '1' },
        { name: 'Externo al Restaurante', value: '2' }
    ];

    const puesto = useSelector((state) => currentId ? state.puestos.find((b) => b._id === currentId) : null);
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Puestos', 
        descripcion: 'Puesto creado automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const [puestoData, setPuestoData] = useState({
        id_consecutivo: '',
        codigo: '',
        nombre: '', 
        internoRestaurante: false,
        externoRestaurante: false, 
        id_evento: '', 
        nombreError: '', 
        internoRestauranteError: '',
        externoRestauranteError: '', 
        id_eventoError: ''
    });


    const validate = () => {

        let nombreError = '';
        let id_eventoError = '';


        if(!puestoData.nombre){
            nombreError = 'Debe ingresar el nombre del puesto';
        }

        if(enabled){
            if(!puestoData.id_evento){
                id_eventoError = 'Debe seleccionar el rol del puesto';
            }else{
                if(radioValue === '1'){
                    console.log("true")
                    puestoData.internoRestaurante = true;
                    puestoData.externoRestaurante = false;
                }else{
                    puestoData.internoRestaurante = false;
                    puestoData.externoRestaurante = true;
                }
            }
        }

    
        if(nombreError || id_eventoError ){
            setPuestoData({ ...puestoData, nombreError, id_eventoError});
            return false;
        }
        
        return true;
    }

    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'PU-';

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

        puestoData.codigo = codigo;

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
    useEffect(() => { 
        if(puesto){
            setPuestoData(puesto);
            (puesto.internoRestaurante === true) ? setRadioValue('1') : setRadioValue('2');
            setEnabled(true);
        } 
    
    }, [puesto]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updatePuesto(currentId, puestoData));
                setCurrenteId(null);
                dispatch(getPuestos());
                clearForm();
                setshow(false);
            }else{
                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setPuestoData({ ...puestoData, id_consecutivo : tempIdConsecutivo});
                dispatch(createPuesto(puestoData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }
    }
        
    const clearForm = () => {
        setCurrenteId(null);
        setRadioValue(null);
        setEnabled(false);
        setPuestoData({
            nombre: '', 
            nombreError: '',
            id_evento: '',
            id_eventoError: '',
        });
    }
    
    
    return(

        <Modal show={isOpen} onHide={setshow} onExit={clearForm} className="modal" >
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Puesto' : 'Crear Puesto'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="3"className="text-right pt-1">
                            <Form.Label >Código</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl type="text" disabled name="codigo" value={!currentId ? generarCodigo() : puestoData.codigo}></FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Nombre</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (puestoData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={puestoData.nombre} onChange={(e) => setPuestoData({ ...puestoData, nombre: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{puestoData.nombreError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row className="float-right">
                        <Col>
                            <ButtonGroup toggle className="mb-3 ">
                                {radios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    type="radio"
                                    variant="secondary"
                                    name="radio"
                                    className="border"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => {setRadioValue(e.currentTarget.value); setEnabled(true)}}
                                >
                                    {radio.name}
                                </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </Col>
                    </Row>

                    <div className="clearfix"></div>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Rol en el Restaurante</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Form.Control as="select" name="id_eventoError"  className={ (puestoData.id_eventoError) ? 'is-invalid' : ''} value={puestoData.id_evento} onChange={(e) => setPuestoData({ ...puestoData, id_evento: e.target.value})} disabled={!enabled}>
                                    <option value="">--Seleccione--</option>
                                    {eventos.map((evento) => <option key={evento._id} value={evento._id}>{evento.nombre}</option>)}               
                                </Form.Control>
                                <small className="form-text text-danger">{puestoData.id_eventoError}</small>
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

export default PuestoForm;