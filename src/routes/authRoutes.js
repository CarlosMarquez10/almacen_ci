import express from 'express';
import { login } from '../controller/authController.js';
import { logout } from "../controller/authController.js";

const router = express.Router();

// Ruta para mostrar el formulario de login
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Ruta para procesar el login
router.post('/login', login);

// Ruta para salir del sistema
router.get('/logout', logout);

export default router;
