import EspecialidadMessage from '../models/especialidadMessage.js';
import mongoose from 'mongoose';


export const getEspecialidades = async (req, res) => {

    try {
        const especialidadesMessages = await EspecialidadMessage.find();
        res.status(200).json(especialidadesMessages); // returns an array with all especialidades

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createEspecialidad = async (req, res) => {

    const especialidad = req.body;
    const newEspecialidad = new EspecialidadMessage(especialidad);

    try {

        await newEspecialidad.save();
        res.status(201).json(newEspecialidad);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}

export const updateEspecialidad = async (req, res) => {
    const { id: _id } = req.params;
    const especialidad = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe una especialidad con ese id');

    const updatedEspecialidad = await EspecialidadMessage.findByIdAndUpdate(_id, { ... especialidad, _id}, { new: true} ); // new: true receive the updated especialidad

    res.json(updatedEspecialidad);
}


export const deleteEspecialidad = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe una especialidad con ese id');

    await EspecialidadMessage.findByIdAndRemove(id);

    res.json({message: 'Especialidad eliminada correctamente'});
}