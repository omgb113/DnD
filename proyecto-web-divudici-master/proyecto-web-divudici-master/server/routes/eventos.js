import express from 'express';

import { getEventos, createEvento, updateEvento, deleteEvento } from '../controllers/eventos.js'

const router = express.Router();

router.get('/', getEventos);
router.post('/', createEvento);
router.patch('/:id', updateEvento);
router.delete('/:id', deleteEvento);

export default router;