import mongoose from 'mongoose';

const consecutivoSchema = mongoose.Schema({
    tipo: String,
    descripcion: String, 
    valor: Number,
    tienePrefijo: Boolean,
    prefijo: String
});

const ConsecutivoMessage = mongoose.model('ConsecutivoMessage', consecutivoSchema);

export default ConsecutivoMessage;