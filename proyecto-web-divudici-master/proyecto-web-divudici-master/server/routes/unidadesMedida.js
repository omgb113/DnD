import express from 'express';

import { getUnidadesMedida, createUnidadMedida, updateUnidadMedida, deleteUnidadMedida } from '../controllers/unidadesMedida.js'

const router = express.Router();

router.get('/', getUnidadesMedida);
router.post('/', createUnidadMedida);
router.patch('/:id', updateUnidadMedida);
router.delete('/:id', deleteUnidadMedida);

export default router;