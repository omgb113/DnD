import express from 'express';

import { getMesas, createMesa, updateMesa, deleteMesa } from '../controllers/mesas.js'

const router = express.Router();

router.get('/', getMesas);
router.post('/', createMesa);
router.patch('/:id', updateMesa);
router.delete('/:id', deleteMesa);

export default router;