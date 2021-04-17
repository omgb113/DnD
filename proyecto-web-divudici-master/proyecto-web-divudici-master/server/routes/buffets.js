import express from 'express';

import { getBuffets, createBuffet, updateBuffet, deleteBuffet } from '../controllers/buffets.js'

const router = express.Router();

router.get('/', getBuffets);
router.post('/', createBuffet);
router.patch('/:id', updateBuffet);
router.delete('/:id', deleteBuffet);

export default router;