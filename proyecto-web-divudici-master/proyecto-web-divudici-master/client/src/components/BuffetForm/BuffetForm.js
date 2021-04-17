import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, FormControl, Modal, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSave } from '@fortawesome/free-solid-svg-icons';
import { getConsecutivos, createConsecutivo, updateConsecutivo } from '../../actions/consecutivos';
import { createBuffet, getBuffets, updateBuffet } from '../../actions/buffets';
import FileBase from 'react-file-base64';
import { createBitacora } from '../../actions/bitacoras';


const BuffetForm = ({currentId, setCurrenteId, isOpen, setshow, bitacoraData, generarCodigoBitacora, bitacoraConsecutivoData}) => {

    const dispatch = useDispatch();
    const unidadesMedidas = useSelector((state) => state.unidadesMedidas);
    const consecutivos = useSelector((state) => state.consecutivos);
    const buffet = useSelector((state) => currentId ? state.buffets.find((r) => r._id === currentId) : null);
    const [tempIdConsecutivo, setTempIdConsecutivo] = useState("");

    const [consecutivoData, setConsecutivoData] = useState({
        tipo: 'Buffet', 
        descripcion: 'Buffet creado automáticamente', 
        valor: '', 
        tienePrefijo: true, 
        prefijo: ''    
    });

    const [buffetData, setBuffetData] = useState({
        id_consecutivo: '',
        codigo: '',
        nombre: '', 
        precio: '',
        tipo: '',
        foto: '',
        id_unidadMedida: '',
        nombreError: '', 
        precioError: '',
        tipoError: '', 
        id_unidadMedidaError: '', 
        fotoError: ''
        
    });

    const validate = () => {

        let nombreError = '';
        let precioError = '';
        let tipoError = '';
        let id_unidadMedidaError = '';
        let fotoError = '';


        if(!buffetData.nombre){
            nombreError = 'Debe ingresar el nombre del platillo';
        }

        if(!buffetData.precio){
            precioError = 'Debe ingresar el precio del platillo';
        }else if(buffetData.precio < 1){
            precioError = 'Números deben ser mayor a 0';
        }

        if(!buffetData.tipo){
            tipoError = 'Debe seleccionar el tipo del platillo';
        }

        if(!buffetData.id_unidadMedida){
            id_unidadMedidaError = 'Debe seleccionar la unidad';
        }

        if(!buffetData.foto){
            fotoError = 'Debe subir una foto para el platillo';
        }

        if(nombreError || precioError || tipoError || id_unidadMedidaError || fotoError ){
            setBuffetData({ ...buffetData, nombreError, precioError, tipoError, id_unidadMedidaError, fotoError});
            return false;
        }
        return true;
    }

    const generarCodigo = () => {

        let codigoEncontrado = false;
        let codigo = '';
        let valorMayor = 0;
        let prefix = 'BUF-';

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

        buffetData.codigo = codigo;

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
    useEffect(() => { if(buffet){setBuffetData(buffet)} 
    }, [buffet]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();

        if(isValid){
            if(currentId) {
                generarCodigoBitacora();
                dispatch(createConsecutivo(bitacoraConsecutivoData));
                bitacoraData.descripcion =  `Edición del buffet ${buffetData.codigo}`;
                dispatch(createBitacora(bitacoraData));
                dispatch(updateBuffet(currentId, buffetData));
                setCurrenteId(null);
                dispatch(getBuffets());
                clearForm();
                setshow(false);
                ;
            }else{
                generarCodigoBitacora();
                dispatch(createConsecutivo(bitacoraConsecutivoData));
                bitacoraData.descripcion =  `Creación del buffet ${buffetData.codigo}`;
                dispatch(createBitacora(bitacoraData));
                dispatch(createConsecutivo(consecutivoData));
                setTempIdConsecutivo(getConsecutivoId());
                setBuffetData({ ...buffetData, id_consecutivo : tempIdConsecutivo});
                dispatch(createBuffet(buffetData));
                dispatch(getConsecutivos());
                generarCodigo();
                clearForm();
                setshow(false);
            }
        }

    }
        
    const clearForm = () => {
        setCurrenteId(null);
        setBuffetData({
            nombre: '', 
            id_nacionalidad: '',
            descripcion: '', 
            fotoMarca: '', 
            cedulaJuridica: '',
            nombreEmpresa: '', 
            detalleEmpresa: '', 
            telefono: '', 
            fotoEmpresa: '',
        });
    }

    console.table(buffetData)
    
    
    return(

        <Modal show={isOpen} onHide={setshow} onExit={clearForm} className="modal">
            <Modal.Header className="mheader" closeButton>
            <Modal.Title>{ currentId ? 'Editar Buffet' : 'Crear Buffet'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mbody">
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} id="consecutivo-form"> 
                    <Row>
                        <Col md="3"className="text-right pt-1">
                            <Form.Label >Código</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl type="text" disabled name="codigo" value={!currentId ? generarCodigo() : buffetData.codigo} ></FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Nombre</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (buffetData.nombreError) ? 'is-invalid' : ''} type="text" name="nombre" value={buffetData.nombre} onChange={(e) => setBuffetData({ ...buffetData, nombre: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{buffetData.nombreError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Precio</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormControl className={ (buffetData.precioError) ? 'is-invalid' : ''} type="number" name="precio" value={buffetData.precio} onChange={(e) => setBuffetData({ ...buffetData, precio: e.target.value})}></FormControl>
                                <small className="form-text text-danger">{buffetData.precioError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Tipo</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Form.Control as="select" name="tipo"  className={ (buffetData.tipoError) ? 'is-invalid' : ''} value={buffetData.tipo} onChange={(e) => setBuffetData({ ...buffetData, tipo: e.target.value})} >
                                    <option value="">--Seleccione--</option>
                                    <option value="Frutas">Frutas</option>
                                    <option value="Marina">Marina</option>
                                    <option value="Mediterranea">Mediterránea</option>
                                    <option value="Vegetal">Vegetal</option>
                                                
                                </Form.Control>
                                <small className="form-text text-danger">{buffetData.tipoError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Unidad de Medida</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Form.Control as="select" name="id_nacionalidad"  className={ (buffetData.id_unidadMedidaError) ? 'is-invalid' : ''} value={buffetData.id_unidadMedida} onChange={(e) => setBuffetData({ ...buffetData, id_unidadMedida: e.target.value})} >
                                    <option value="">--Seleccione--</option>
                                    {unidadesMedidas.map((unidad) => <option key={unidad._id} value={unidad._id}>{unidad.unidad}</option>)}               
                                </Form.Control>
                                <small className="form-text text-danger">{buffetData.id_unidadMedidaError}</small>
                            </FormGroup>
                        </Col>
                    </Row>



                    <Row>
                        <Col md="3" className="text-right pt-1">
                            <Form.Label>Foto</Form.Label>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FileBase className={ (buffetData.fotoError) ? 'is-invalid' : ''} type="file" multiple={false} name="foto" value={buffetData.foto} onDone={({base64}) => setBuffetData({ ...buffetData, foto: base64})}></FileBase>
                                <small className="form-text text-danger">{buffetData.fotoError}</small>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3" className="text-right pt-1">
                            
                        </Col>
                        <Col>
                            <FormGroup>
                                <img className="img-fluid pr-5 pl-5" src={buffetData.foto}/>
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

export default BuffetForm;