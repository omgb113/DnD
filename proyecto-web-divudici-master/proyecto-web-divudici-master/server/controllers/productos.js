import ProductoMessage from '../models/productoMessage.js';
import mongoose from 'mongoose';


export const getProductos = async (req, res) => {

    try {
        const productosMessages = await ProductoMessage.find();
        res.status(200).json(productosMessages); // returns an array with all productos

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createProducto = async (req, res) => {

    const producto = req.body;
    const newProducto = new ProductoMessage(producto);

    try {

        await newProducto.save();
        res.status(201).json(newProducto);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}

export const updateProducto = async (req, res) => {
    const { id: _id } = req.params;
    const producto = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe un producto con ese id');

    const updatedProducto = await ProductoMessage.findByIdAndUpdate(_id, { ... producto, _id}, { new: true} ); // new: true receive the updated producto

    res.json(updatedProducto);
}


export const deleteProducto = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe un producto con ese id');

    await ProductoMessage.findByIdAndRemove(id);

    res.json({message: 'Producto eliminado correctamente'});
}