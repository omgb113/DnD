import express from 'express';

import { getClientes, createCliente, updateCliente, deleteCliente } from '../controllers/clientes.js'

const router = express.Router();

router.get('/', getClientes);
router.post('/', createCliente);
router.patch('/:id', updateCliente);
router.delete('/:id', deleteCliente);

export default router;