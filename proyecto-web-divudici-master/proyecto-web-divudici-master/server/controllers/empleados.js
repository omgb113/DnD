import EmpleadoMessage from '../models/empleadoMessage.js';
import mongoose from 'mongoose';


export const getEmpleados = async (req, res) => {

    try {
        const empleadosMessages = await EmpleadoMessage.find();
        res.status(200).json(empleadosMessages); // returns an array with all empleados

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createEmpleado = async (req, res) => {

    const empleado = req.body;
    const newEmpleado = new EmpleadoMessage(empleado);

    try {

        await newEmpleado.save();
        res.status(201).json(newEmpleado);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}

export const updateEmpleado = async (req, res) => {
    const { id: _id } = req.params;
    const empleado = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe un empleado con ese id');

    const updatedEmpleado = await EmpleadoMessage.findByIdAndUpdate(_id, { ... empleado, _id}, { new: true} ); // new: true receive the updated empleado

    res.json(updatedEmpleado);
}


export const deleteEmpleado= async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe un empleado con ese id');

    await EmpleadoMessage.findByIdAndRemove(id);

    res.json({message: 'Empleado eliminado correctamente'});
}