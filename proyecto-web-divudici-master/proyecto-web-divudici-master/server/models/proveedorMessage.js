import mongoose from 'mongoose';

const proveedorSchema = mongoose.Schema({
    codigo: String,
    cedula: Number,
    fechaIngreso: String,
    nombre: String, 
    primerApellido: String, 
    segundoApellido: String,
    correoElectronico: String,
    direccion: String,
    foto: String,
    telefonoOficina: Number,
    telefonoFax: Number,
    telefonoCelular: Number,
    productos: Array,
    nombreContacto: String,
    telefonoContacto: Number,
    direccionContacto: String
});

const ProveedorMessage = mongoose.model('ProveedorMessage', proveedorSchema);

export default ProveedorMessage;