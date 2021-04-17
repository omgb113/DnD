import BitacoraMessage from '../models/bitacoraMessage.js';
import mongoose from 'mongoose';


export const getBitacoras = async (req, res) => {

    try {
        const bitacorasMessages = await BitacoraMessage.find();
        res.status(200).json(bitacorasMessages); // returns an array with all bebidas

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createBitacora = async (req, res) => {

    const bitacora = req.body;
    const newBitacora = new BitacoraMessage(bitacora);

    try {

        await newBitacora.save();
        res.status(201).json(newBitacora);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}
