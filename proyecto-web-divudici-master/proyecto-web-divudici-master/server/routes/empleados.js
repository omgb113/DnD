import express from 'express';

import { getEmpleados, createEmpleado, updateEmpleado, deleteEmpleado } from '../controllers/empleados.js'

const router = express.Router();

router.get('/', getEmpleados);
router.post('/', createEmpleado);
router.patch('/:id', updateEmpleado);
router.delete('/:id', deleteEmpleado);

export default router;