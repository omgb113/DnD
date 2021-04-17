import PuestoMessage from '../models/puestoMessage.js';
import mongoose from 'mongoose';


export const getPuestos = async (req, res) => {

    try {
        const puestosMessages = await PuestoMessage.find();
        res.status(200).json(puestosMessages); // returns an array with all puestos

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createPuesto = async (req, res) => {

    const puesto = req.body;
    const newPuesto = new PuestoMessage(puesto);

    try {

        await newPuesto.save();
        res.status(201).json(newPuesto);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}

export const updatePuesto = async (req, res) => {
    const { id: _id } = req.params;
    const puesto = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe un puesto con ese id');

    const updatedPuesto = await PuestoMessage.findByIdAndUpdate(_id, { ... puesto, _id}, { new: true} ); // new: true receive the updated puesto

    res.json(updatedPuesto);
}


export const deletePuesto = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe un puesto con ese id');

    await PuestoMessage.findByIdAndRemove(id);

    res.json({message: 'Puesto eliminado correctamente'});
}