import express from 'express';

import { getMarcas, createMarca, updateMarca, deleteMarca } from '../controllers/marcas.js'

const router = express.Router();

router.get('/', getMarcas);
router.post('/', createMarca);
router.patch('/:id', updateMarca);
router.delete('/:id', deleteMarca);

export default router;