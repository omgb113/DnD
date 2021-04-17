import express from 'express';

import { getPaises, createPais, updatePais, deletePais } from '../controllers/paises.js'

const router = express.Router();

router.get('/', getPaises);
router.post('/', createPais);
router.patch('/:id', updatePais);
router.delete('/:id', deletePais);

export default router;