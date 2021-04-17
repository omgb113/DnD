import mongoose from 'mongoose';

const paisSchema = mongoose.Schema({
    codigo: String,
    nombre: String, 
    bandera: String
});

const PaisMessage = mongoose.model('PaisMessage', paisSchema);

export default PaisMessage;