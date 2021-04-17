import express from 'express';

import { getEspecialidades, createEspecialidad, updateEspecialidad, deleteEspecialidad } from '../controllers/especialidades.js'

const router = express.Router();

router.get('/', getEspecialidades);
router.post('/', createEspecialidad);
router.patch('/:id', updateEspecialidad);
router.delete('/:id', deleteEspecialidad);

export default router;