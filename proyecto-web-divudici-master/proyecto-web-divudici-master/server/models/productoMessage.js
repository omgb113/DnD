import mongoose from 'mongoose';

const productoSchema = mongoose.Schema({
    codigo: String,
    nombre: String, 
    cantidad: Number,
    tipo: String, 
    id_restaurante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestauranteMessage'
    },
    id_marca: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MarcaMessage'
    },
    clase: String, 
    linea: String, 
    id_unidad_medida: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UnidadMedidaMessage'
    },
    descripcion: String, 
    cantidadMedida: String
});

const ProductoMessage = mongoose.model('ProductoMessage', productoSchema);

export default ProductoMessage;