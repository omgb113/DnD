import mongoose from 'mongoose';

const clienteSchema = mongoose.Schema({
    codigo: String,
    nombre: String, 
    montopagado: Number,
    detalle: String,
    fecha: String,
    reservacion: Boolean,
    id_restaurante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestauranteMessage'
    }
});

const ClienteMessage = mongoose.model('ClienteMessage', clienteSchema);

export default ClienteMessage;