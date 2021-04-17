import mongoose from 'mongoose';

const puestoSchema = mongoose.Schema({
    codigo: String,
    nombre: String, 
    internoRestaurante: Boolean,
    externoRestaurante: Boolean,
    id_evento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventoMessage'
    }
});

const PuestoMessage = mongoose.model('PuestoMessage', puestoSchema);

export default PuestoMessage;