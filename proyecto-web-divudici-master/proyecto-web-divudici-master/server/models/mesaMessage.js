import mongoose from 'mongoose';

const mesaSchema = mongoose.Schema({
    codigo: String,
    nombre: {
        type: String,
        unique: true
    }, 
    numero: Number,
    cantidadSillas: Number,
    id_restaurante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestauranteMessage'
    },
});

const MesaMessage = mongoose.model('MesaMessage', mesaSchema);

export default MesaMessage;