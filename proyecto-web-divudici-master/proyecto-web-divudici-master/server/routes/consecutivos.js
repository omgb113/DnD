import express from 'express';

import { getConsecutivos, createConsecutivo, updateConsecutivo, deleteConsecutivo } from '../controllers/consecutivos.js'

const router = express.Router();

router.get('/', getConsecutivos);
router.post('/', createConsecutivo);
router.patch('/:id', updateConsecutivo);
router.delete('/:id', deleteConsecutivo);

export default router;