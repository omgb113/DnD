import express from 'express';

import { getBebidas, createBebida, updateBebida, deleteBebida } from '../controllers/bebidas.js'

const router = express.Router();

router.get('/', getBebidas);
router.post('/', createBebida);
router.patch('/:id', updateBebida);
router.delete('/:id', deleteBebida);

export default router;