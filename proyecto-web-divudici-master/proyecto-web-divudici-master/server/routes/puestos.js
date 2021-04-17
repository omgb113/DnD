import express from 'express';

import { getPuestos, createPuesto, updatePuesto, deletePuesto } from '../controllers/puestos.js'

const router = express.Router();

router.get('/', getPuestos);
router.post('/', createPuesto);
router.patch('/:id', updatePuesto);
router.delete('/:id', deletePuesto);

export default router;