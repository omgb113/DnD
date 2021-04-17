import mongoose from 'mongoose';

const bebidaSchema = mongoose.Schema({
    codigo: String,
    nombre: String, 
    ingredientes: Array,
    precioUnitario: Number,
    precioBotella: Number,
    id_restaurante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestauranteMessage'
    },
    id_marca: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MarcaMessage'
    },
    id_nacionalidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaisMessage'
    },
    descripcion: String, 
    foto: String,
    cantidad: Number, 
    annoCosecha: Number
});

const BebidaMessage = mongoose.model('BebidaMessage', bebidaSchema);

export default BebidaMessage;