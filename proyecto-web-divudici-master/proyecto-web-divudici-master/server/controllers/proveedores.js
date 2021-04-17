import ProveedorMessage from '../models/proveedorMessage.js';
import mongoose from 'mongoose';


export const getProveedores = async (req, res) => {

    try {
        const proveedoresMessages = await ProveedorMessage.find();
        res.status(200).json(proveedoresMessages); // returns an array with all proveedores

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createProveedor = async (req, res) => {

    const proveedor = req.body;
    const newProveedor = new ProveedorMessage(proveedor);

    try {

        await newProveedor.save();
        res.status(201).json(newProveedor);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}

export const updateProveedor = async (req, res) => {
    const { id: _id } = req.params;
    const proveedor = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe un proveedor con ese id');

    const updatedProveedor = await ProveedorMessage.findByIdAndUpdate(_id, { ... proveedor, _id}, { new: true} ); // new: true receive the updated proveedor

    res.json(updatedProveedor);
}


export const deleteProveedor = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe un proveedor con ese id');

    await ProveedorMessage.findByIdAndRemove(id);

    res.json({message: 'Proveedor eliminado correctamente'});
}