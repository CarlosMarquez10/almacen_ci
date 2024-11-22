import { getUserByUsername } from '../model/usuarioModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Obtener el usuario de la base de datos
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(401).render('login', { error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).render('login', { error: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // Guardar el token en una cookie segura
    res.cookie('token', token, { httpOnly: true });

    // Redirigir al usuario a la página de inicio o dashboard
    res.redirect('/consultarEmpleado');
  } catch (error) {
    console.error(error);
    res.status(500).render('login', { error: 'Error del servidor' });
  }
};

// salir de login
export const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};

