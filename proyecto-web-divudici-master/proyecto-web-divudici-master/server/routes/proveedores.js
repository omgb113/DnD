import express from 'express';

import { getProveedores, createProveedor, updateProveedor, deleteProveedor } from '../controllers/proveedores.js'

const router = express.Router();

router.get('/', getProveedores);
router.post('/', createProveedor);
router.patch('/:id', updateProveedor);
router.delete('/:id', deleteProveedor);

export default router;