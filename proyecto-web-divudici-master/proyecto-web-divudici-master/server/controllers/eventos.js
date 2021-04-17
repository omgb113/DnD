import EventoMessage from '../models/eventoMessage.js';
import mongoose from 'mongoose';


export const getEventos = async (req, res) => {

    try {

        const eventoMessages = await EventoMessage.find();
        res.status(200).json(eventoMessages); // returns an array with all eventos

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createEvento = async (req, res) => {

    const evento = req.body;
    const newEvento = new EventoMessage(evento);

    console.table(evento);

    try {

        await newEvento.save();
        res.status(201).json(newEvento);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}

export const updateEvento = async (req, res) => {
    const { id: _id } = req.params;
    const evento = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe un evento con ese id');

    const updatedEvento = await EventoMessage.findByIdAndUpdate(_id, { ... evento, _id}, { new: true} ); // new: true receive the updated evento

    res.json(updatedEvento);
}


export const deleteEvento = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe un evento con ese id');

    await EventoMessage.findByIdAndRemove(id);

    res.json({message: 'Evento eliminado correctamente'});
}