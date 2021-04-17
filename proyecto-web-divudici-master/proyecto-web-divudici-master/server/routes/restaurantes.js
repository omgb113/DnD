import express from 'express';

import { getRestaurantes, createRestaurante, updateRestaurante, deleteRestaurante } from '../controllers/restaurantes.js'

const router = express.Router();

router.get('/', getRestaurantes);
router.post('/', createRestaurante);
router.patch('/:id', updateRestaurante);
router.delete('/:id', deleteRestaurante);

export default router;