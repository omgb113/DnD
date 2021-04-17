import express from 'express';

import { getBitacoras, createBitacora } from '../controllers/bitacoras.js'

const router = express.Router();

router.get('/', getBitacoras);
router.post('/', createBitacora);

export default router;