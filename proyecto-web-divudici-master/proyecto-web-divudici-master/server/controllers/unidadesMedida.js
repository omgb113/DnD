import UnidadMedidaMessage from '../models/unidadMedidaMessage.js';
import mongoose from 'mongoose';



export const getUnidadesMedida = async (req, res) => {

    try {

        const unidadMedidaMessages = await UnidadMedidaMessage.find();
        res.status(200).json(unidadMedidaMessages); // returns an array with all unidades de medida

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createUnidadMedida = async (req, res) => {

    const unidadMedida = req.body;
    const newUnidadMedida = new UnidadMedidaMessage(unidadMedida);

    console.table(unidadMedida);

    try {

        await newUnidadMedida.save();
        res.status(201).json(newUnidadMedida);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}

export const updateUnidadMedida = async (req, res) => {
    const { id: _id } = req.params;
    const unidadMedida = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe una unidad de medida con ese id');

    const updatedUnidadMedida = await UnidadMedidaMessage.findByIdAndUpdate(_id, { ... unidadMedida, _id}, { new: true} ); // new: true receive the updated unidad de medida

    res.json(updatedUnidadMedida);
}


export const deleteUnidadMedida = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe una unidad de medida con ese id');

    await UnidadMedidaMessage.findByIdAndRemove(id);

    res.json({message: 'Unidad de Medida eliminada correctamente'});
}