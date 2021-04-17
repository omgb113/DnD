import mongoose from 'mongoose';

const marcaSchema = mongoose.Schema({
    codigo: String,
    nombre: String, 
    id_nacionalidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaisMessage'
    },
    descripcion: String, 
    fotoMarca: String, 
    cedulaJuridica: Number,
    nombreEmpresa: String, 
    detalleEmpresa: String, 
    telefono: Number, 
    fotoEmpresa: String
});

const MarcaMessage = mongoose.model('MarcaMessage', marcaSchema);

export default MarcaMessage;