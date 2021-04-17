import MarcaMessage from '../models/marcaMessage.js';
import mongoose from 'mongoose';


export const getMarcas = async (req, res) => {

    try {

        const marcaMessages = await MarcaMessage.find();
        res.status(200).json(marcaMessages); // returns an array with all marcas

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createMarca = async (req, res) => {

    const marca = req.body;
    const newMarca = new MarcaMessage(marca);

    console.log("Creando marca");

    try {

        await newMarca.save();
        res.status(201).json(newMarca);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}

export const updateMarca = async (req, res) => {
    const { id: _id } = req.params;
    const marca = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe una marca con ese id');

    const updatedMarca = await MarcaMessage.findByIdAndUpdate(_id, { ... marca, _id}, { new: true} ); // new: true receive the updated marca

    res.json(updatedMarca);
}


export const deleteMarca = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe un marca con ese id');

    await MarcaMessage.findByIdAndRemove(id);

    res.json({message: 'Marca eliminada correctamente'});
}