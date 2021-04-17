import mongoose from 'mongoose';

const bitacoraSchema = mongoose.Schema({
    codigo: String,
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsuarioMessage'
    },
    fecha: { type: Date, default: Date.now },
    descripcion: String
});

const BitacoraMessage = mongoose.model('BitacoraMessage', bitacoraSchema);

export default BitacoraMessage;