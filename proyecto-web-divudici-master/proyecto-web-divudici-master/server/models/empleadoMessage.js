import mongoose from 'mongoose';

const empleadoSchema = mongoose.Schema({
    codigo: String,
    cedula: Number,
    nombre: String, 
    primerApellido: String, 
    segundoApellido: String, 
    telefono1: Number,
    telefono2: Number,
    id_puesto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PuestoMessage'
    },
    id_nacionalidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaisMessage'
    },
    foto: String,
    id_restaurante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestauranteMessage'
    }
});

const EmpleadoMessage = mongoose.model('EmpleadoMessage', empleadoSchema);

export default EmpleadoMessage;