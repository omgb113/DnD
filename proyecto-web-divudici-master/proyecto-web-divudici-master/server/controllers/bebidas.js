import BebidaMessage from '../models/bebidaMessage.js';
import BitacoraMessage from '../models/bitacoraMessage.js';
import ConsecutivoMessage from '../models/consecutivoMessage.js';
import mongoose from 'mongoose';

export const getBebidas = async (req, res) => {

    try {
        const bebidasMessages = await BebidaMessage.find();
        res.status(200).json(bebidasMessages); // returns an array with all bebidas

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createBebida = async (req, res) => {

    const bebida = req.body;
    const newBebida = new BebidaMessage(bebida);

    try {

        await newBebida.save();
        res.status(201).json(newBebida);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}

export const updateBebida = async (req, res) => {
    const { id: _id } = req.params;
    const bebida = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe una bebida con ese id');

    const updatedBebida = await BebidaMessage.findByIdAndUpdate(_id, { ... bebida, _id}, { new: true} ); // new: true receive the updated bebida

    res.json(updatedBebida);
}


export const deleteBebida = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe una bebida con ese id');

    await BebidaMessage.findByIdAndRemove(id);

    res.json({message: 'Bebida eliminada correctamente'});
}