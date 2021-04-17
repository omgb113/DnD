import express from 'express';

import { getProductos, createProducto, updateProducto, deleteProducto } from '../controllers/productos.js'

const router = express.Router();

router.get('/', getProductos);
router.post('/', createProducto);
router.patch('/:id', updateProducto);
router.delete('/:id', deleteProducto);

export default router;