import MesaMessage from '../models/mesaMessage.js';
import mongoose from 'mongoose';


export const getMesas = async (req, res) => {

    try {
        const mesasMessages = await MesaMessage.find();
        res.status(200).json(mesasMessages); // returns an array with all mesasMessages

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createMesa = async (req, res) => {

    const mesa = req.body;
    const newMesa = new MesaMessage(mesa);

    try {

        await newMesa.save();
        res.status(201).json(newMesa);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}

export const updateMesa = async (req, res) => {
    const { id: _id } = req.params;
    const mesa = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe una mesa con ese id');

    const updatedMesa = await MesaMessage.findByIdAndUpdate(_id, { ... mesa, _id}, { new: true} ); // new: true receive the updated mesa

    res.json(updatedMesa);
}


export const deleteMesa = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe una mesa con ese id');

    await MesaMessage.findByIdAndRemove(id);

    res.json({message: 'Mesa eliminada correctamente'});
}