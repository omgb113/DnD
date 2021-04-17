import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, createConsecutivo, updateConsecutivo  } from '../../actions/consecutivos';
import { createUnidadMedida, getUnidadesMedidas, updateUnidadMedida } from '../../actions/unidadesMedidas';


const UnidadMedidaForm = ({currentId, setCurrenteId, isOpen, setshow, onExit, currentConsecutivo, setCurrentConsecutivo}) => {

    const dispatch = useDispatch();
    const unidadMedida = useSelector((state) => currentId ? state.unidadesMedidas.find((u) => u._id === currentId) : null);
    const consecutivos = useSelector((state) => state.consecutivos);
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Unidades de Medida', 
        descripcion: 'Unidad de Medida creada automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const [unidadMedidaData, setUnidadMedidaData] = useState({
        id_consecutivo: '',
        codigo: '', 
        unidad: '', 
        escala: '', 
        simbolo: '', 
        detalle: '', 
        simbologia: '', 
        unidadError: '', 
        escalaError: '', 
        detalleError: ''    
    });

    const [scales, setScales] = useState([
        { label: "Unidad", value: "Unidad", symbol: "" },
        { label: "Yotta", value: "Yotta", symbol: "Y" },
        { label: "Zeta", value: "Zeta", symbol: "Z" },
        { label: "Exa", value: "Exa", symbol: "E" },
        { label: "Peta", value: "Peta", symbol: "P" },
        { label: "Tera", value: "Tera", symbol: "T" },
        { label: "Giga", value: "Giga", symbol: "G" },
        { label: "Mega", value: "Mega", symbol: "Z" },
        { label: "Kilo", value: "Kilo", symbol: "K" },
        { label: "Hecto", value: "Hecto", symbol: "H" },
        { label: "Deca", value: "Deca", symbol: "Da" },
        { label: "Deci", value: "Deci", symbol: "d" },
        { label: "Centi", value: "Centi", symbol: "c" },
        { label: "Mili", value: "Mili", symbol: "m" },
        { label: "Micro", value: "Micro", symbol: "μ" },
        { label: "Nano", value: "Nano", symbol: "n" },
        { label: "Pico", value: "Pico", symbol: "p" },
        { label: "Femto", value: "Femto", symbol: "f" },
        { label: "Atto", value: "Atto", symbol: "a" },
        { label: "Zepto", value: "Zepto", symbol: "z" },
        { label: "Yocto", value: "Yocto", symbol: "y" },
    ]);

    const [units, setUnits] = useState([
        { label: "UNIDADES DE CAPACIDAD", value: "", symbology: "" },
        { label: "kilolitro", value: "kilolitro", symbology: "kl" },
        { label: "hectolitro", value: "hectolitro", symbology: "hl" },
        { label: "litro", value: "litro", symbology: "l" },
        { label: "decilitro", value: "decilitro", symbology: "dl" },
        { label: "centilitro", value: "centilitro", symbology: "cl" },
        { label: "mililitro", value: "mililitro", symbology: "ml" },
        { label: "UNIDADES DE FUERZA", value: "", symbology: "" },
        { label: "kilogramo fuerza", value: "kilogramo fuerza", symbology: "kgf" },
        { label: "gramo fuerza", value: "gramo fuerza", symbology: "gf" },
        { label: "tonelada fuerza", value: "tonelada fuerza	", symbology: "tf" },
        { label: "dina", value: "dina", symbology: "dyn" },
        { label: "libra fuerza	", value: "libra fuerza	", symbology: "1bf" },
        { label: "sthene", value: "sthene", symbology: "sn" },
        { label: "poundal", value: "poundal", symbology: "pdl" },
        { label: "onza fuerza", value: "onza fuerza", symbology: "ozf" },
    ]);

    const setSimbolo = (e) => {
        scales.forEach(scale => {
            if(e.target.value ===""){

                setUnidadMedidaData({ ...unidadMedidaData, escala: e.target.value, simbolo: "", unidadError: ""});

            }else if(e.target.value === "Unidad"){

                if(unidadMedidaData.unidad){
                    setUnidadMedidaData({ ...unidadMedidaData, escala: e.target.value, simbolo: unidadMedidaData.unidad, unidadError: ""});
                }else{
                    setUnidadMedidaData({ ...unidadMedidaData,  escala: e.target.value, simbolo: "", unidadError: "Debe ingresar la unidad"});
                }
                
            }else if(e.target.value === scale.value){
                setUnidadMedidaData({ ...unidadMedidaData, escala: e.target.value, simbolo: scale.symbol});
            }
            
        });
    };

    const setSimbologia = (e) => {
        units.forEach(unit => {

            if(e.target.value ===""){

                setUnidadMedidaData({ ...unidadMedidaData, detalle: e.target.value, simbologia: "", unidadError: ""});

            }else if(e.target.value === unit.value){
                setUnidadMedidaData({ ...unidadMedidaData, detalle: e.target.value, simbologia: unit.symbology});
            }
        });
    };
   
    const validate = () => {

        let unidadError ='';
        let escalaError = '';
        let detalleError = '';

        if(!unidadMedidaData.unidad){
            unidadError = 'Debe ingresar la unidad';
        }

        if(!unidadMedidaData.escala){
            escalaError = 'Debe seleccionar una escala';
        }

        if(!unidadMedidaData.detalle){
            detalleError = 'Debe seleccionar un detalle';
        }

        if(unidadError || escalaError ||  detalleError){
            setUnidadMedidaData({ ...unidadMedidaData, unidadError, escalaError , detalleError });
            return false;
        }

        
        return true;

    }

    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'UM-';

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

        unidadMedidaData.codigo = codigo;

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
    useEffect(() => { if(unidadMedida){setUnidadMedidaData(unidadMedida)} 
    }, [unidadMedida]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                dispatch(updateUnidadMedida(currentId, unidadMedidaData));
                setCurrenteId(null);
                dispatch(getUnidadesMedidas());
                clearForm();
                setshow(false);
            }else{

                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setUnidadMedidaData({ ...unidadMedidaData, id_consecutivo : tempIdConsecutivo});
                dispatch(createUnidadMedida(unidadMedidaData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);

                
            }
        }

    }
        

    const clearForm = () => {
        setCurrenteId(null);
        setUnidadMedidaData({unidad: '', escala: '', simbolo: '', detalle: '', simbologia: ''});
    }

    console.table(unidadMedidaData);

    
    return(

        <Modal show={isOpen} onHide={setshow} onExit={clearForm}  className="modal">
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Unidad de Medida' : 'Crear Unidad de Medida'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="3"className="text-right pt-1">
                            <Form.Label >Código</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl type="text" disabled name="codigo" value={!currentId ? generarCodigo() : unidadMedidaData.codigo} ></FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Unidad</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (unidadMedidaData.unidadError) ? 'is-invalid' : ''} type="text" name="unidad" value={unidadMedidaData.unidad} onChange={(e) => {setUnidadMedidaData({ ...unidadMedidaData, unidad: e.target.value})}}></FormControl>
                                <small className="form-text text-danger">{unidadMedidaData.unidadError}</small>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Escala</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Form.Control as="select" name="escala" className={ (unidadMedidaData.escalaError) ? 'is-invalid' : ''} value={unidadMedidaData.escala} onChange={(e) => setSimbolo(e)}>
                                    <option value="">--Seleccione--</option>
                                    {scales.map((scale) => <option key={scale.value} value={scale.value}>{scale.label}</option>)}               
                                </Form.Control>
                                <small className="form-text text-danger">{unidadMedidaData.escalaError}</small>
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <FormControl type="text" name="simbolo" value={unidadMedidaData.simbolo} disabled placeholder="Símbolo"></FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Detalle</Form.Label>
                        </Col>
                        <Col>
                        <FormGroup>
                                <Form.Control as="select" name="detalle" className={ (unidadMedidaData.detalleError) ? 'is-invalid' : ''} value={unidadMedidaData.detalle} onChange={(e) => setSimbologia(e)}>
                                    
                                    <option value="">--Seleccione--</option>
                                    {units.map((unit) => <option key={unit.value} value={unit.value}>{unit.label}</option>)} 
                                </Form.Control>
                                <small className="form-text text-danger">{unidadMedidaData.detalleError}</small>
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <FormControl type="text" name="simbologia" value={unidadMedidaData.simbologia} onChange={(e) => setUnidadMedidaData({ ...unidadMedidaData, simbologia: e.target.value})} disabled placeholder="Simbología"></FormControl>
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

export default UnidadMedidaForm;