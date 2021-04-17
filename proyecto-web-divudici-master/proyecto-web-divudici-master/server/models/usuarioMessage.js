import mongoose from 'mongoose';

const usuarioSchema = mongoose.Schema({
    codigo: String,
    nombre: String, 
    primerApellido: String,
    segundoApellido: String,
    telefonoFijo: Number,
    telefonoCelular: Number,
    privilegio: String,
    id_restaurante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestauranteMessage'
    },
    login: {
        type: String,
        unique: true
    },
    password: String,
    password2: String
});

const UsuarioMessage = mongoose.model('UsuarioMessage', usuarioSchema);

export default UsuarioMessage;