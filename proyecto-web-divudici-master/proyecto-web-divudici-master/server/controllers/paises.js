import PaisMessage from '../models/paisMessage.js';
import mongoose from 'mongoose';


export const getPaises = async (req, res) => {

    try {

        const paisMessages = await PaisMessage.find();
        res.status(200).json(paisMessages); // returns an array with all paises

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createPais = async (req, res) => {

    const pais = req.body;
    const newPais = new PaisMessage(pais);

    console.table(pais);

    try {

        await newPais.save();
        res.status(201).json(newPais);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}

export const updatePais = async (req, res) => {
    const { id: _id } = req.params;
    const pais = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe un país con ese id');

    const updatedPais = await PaisMessage.findByIdAndUpdate(_id, { ... pais, _id}, { new: true} ); // new: true receive the updated pais

    res.json(updatedPais);
}


export const deletePais = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe un país con ese id');

    await PaisMessage.findByIdAndRemove(id);

    res.json({message: 'País eliminado correctamente'});
}