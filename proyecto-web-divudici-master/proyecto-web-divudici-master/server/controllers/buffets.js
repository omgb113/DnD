import BuffetMessage from '../models/buffetMessage.js';
import mongoose from 'mongoose';


export const getBuffets = async (req, res) => {

    try {

        const buffetMessages = await BuffetMessage.find();
        res.status(200).json(buffetMessages); // returns an array with all buffets

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createBuffet = async (req, res) => {

    const buffet = req.body;
    const newBuffet = new BuffetMessage(buffet);

    try {

        await newBuffet.save();
        res.status(201).json(newBuffet);
        console.log("BUFFET CREADO");

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}

export const updateBuffet = async (req, res) => {
    const { id: _id } = req.params;
    const buffet = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe una buffet con ese id');

    const updatedBuffet = await BuffetMessage.findByIdAndUpdate(_id, { ... buffet, _id}, { new: true} ); // new: true receive the updated buffet

    res.json(updatedBuffet);
}


export const deleteBuffet = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe un buffet con ese id');

    await BuffetMessage.findByIdAndRemove(id);

    res.json({message: 'Buffet eliminado correctamente'});
}