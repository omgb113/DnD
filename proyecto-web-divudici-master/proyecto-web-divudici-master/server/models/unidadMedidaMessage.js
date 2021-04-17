import mongoose from 'mongoose';

const unidadMedidaSchema = mongoose.Schema({
    codigo: String,
    unidad: String,
    escala: String, 
    detalle: String, 
    simbolo: String, 
    simbologia: String
});

const UnidadMedidaMessage = mongoose.model('UnidadMedidaMessage', unidadMedidaSchema);

export default UnidadMedidaMessage;