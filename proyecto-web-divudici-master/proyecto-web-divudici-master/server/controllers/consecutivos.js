import ConsecutivoMessage from '../models/consecutivoMessage.js';
import mongoose from 'mongoose';


export const getConsecutivos = async (req, res) => {

    try {

        const consecutivoMessages = await ConsecutivoMessage.find();
        res.status(200).json(consecutivoMessages); // returns an array with all consecutivos

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createConsecutivo = async (req, res) => {

    const consecutivo = req.body;
    const newConsecutivo = new ConsecutivoMessage(consecutivo);

    try {

        await newConsecutivo.save();
        res.status(201).json(newConsecutivo);

    } catch (error) {
        
        res.status(409).json({ message: error.message });
    }
    
}

export const updateConsecutivo = async (req, res) => {
    const { id: _id } = req.params;
    const consecutivo = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe un consecutivo con ese id');

    const updatedConsecutivo = await ConsecutivoMessage.findByIdAndUpdate(_id, { ... consecutivo, _id}, { new: true} ); // new: true receive the updated consecutivo

    res.json(updatedConsecutivo);
}


export const deleteConsecutivo = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe un consecutivo con ese id');

    await ConsecutivoMessage.findByIdAndRemove(id);

    res.json({message: 'Consecutivo eliminado correctamente'});
}