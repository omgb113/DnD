import express from 'express';

import { getUsuarios, createUsuario, updateUsuario, deleteUsuario, login} from '../controllers/usuarios.js'

const router = express.Router();

router.get('/', getUsuarios);
router.post('/', createUsuario);
router.post('/login', login);
router.patch('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;