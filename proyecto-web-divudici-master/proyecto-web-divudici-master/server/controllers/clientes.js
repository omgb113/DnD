import ClienteMessage from '../models/clienteMessage.js';
import BitacoraMessage from '../models/bitacoraMessage.js';
import ConsecutivoMessage from '../models/consecutivoMessage.js';
import mongoose from 'mongoose';

export const getClientes = async (req, res) => {

    try {
        const clientesMessage = await ClienteMessage.find();
        res.status(200).json(clientesMessage); // returns an array with all clientes

    } catch (error) {
        
        res.status(404).json({message: error.message});
    }
}

export const createCliente = async (req, res) => {

    const cliente = req.body;
    const newCliente = new ClienteMessage(cliente);

    try {

        await newCliente.save();
        res.status(201).json(newCliente);

    } catch (error) {
        
        console.log(error);
        res.status(409).json({ message: error.message });
    }
    
}

export const updateCliente = async (req, res) => {
    const { id: _id } = req.params;
    const cliente = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe un cliente con ese id');

    const updatedCliente = await ClienteMessage.findByIdAndUpdate(_id, { ... cliente, _id}, { new: true} ); // new: true receive the updated cliente

    res.json(updatedCliente);
}


export const deleteCliente = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe un cliente con ese id');

    await ClienteMessage.findByIdAndRemove(id);

    res.json({message: 'Cliente eliminado correctamente'});
}