import mongoose from 'mongoose';

const eventoSchema = mongoose.Schema({
    codigo: String,
    nombre: String, 
    descripcion: String
});

const EventoMessage = mongoose.model('EventoMessage', eventoSchema);

export default EventoMessage;