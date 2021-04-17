import RestauranteMessage from '../models/restauranteMessage.js';
import mongoose from 'mongoose';


export const getRestaurantes = async (req, res) => {

    try {

        const restauranteMessages = await RestauranteMessage.find();
        res.status(200).json(restauranteMessages); // returns an array with all restaurantes

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createRestaurante = async (req, res) => {

    const restaurante = req.body;
    const newRestaurante = new RestauranteMessage(restaurante);

    console.table(restaurante);

    try {

        await newRestaurante.save();
        res.status(201).json(newRestaurante);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}

export const updateRestaurante = async (req, res) => {
    const { id: _id } = req.params;
    const restaurante = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe un restaurante con ese id');

    const updatedRestaurante = await RestauranteMessage.findByIdAndUpdate(_id, { ... restaurante, _id}, { new: true} ); // new: true receive the updated restaurante

    res.json(updatedRestaurante);
}


export const deleteRestaurante = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe un restaurante con ese id');

    await RestauranteMessage.findByIdAndRemove(id);

    res.json({message: 'Restaurante eliminado correctamente'});
}