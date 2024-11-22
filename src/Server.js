import express from 'express';
import { authenticateToken  } from "../src/middleware/authMiddleware.js";
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'; // Importar cookie-parser
import authRoutes from './routes/authRoutes.js'; // Importar rutas de autenticación

const app = express();

// Configuración necesaria si usas ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración del motor para las vistas de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuraciones para parsear el JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración para manejar cookies
app.use(cookieParser());

// Configuraciones para servir archivos de la carpeta public
app.use(express.static('public'));

// Usar las rutas de autenticación
app.use('/', authRoutes);

// Rutas
app.get("/inicio", (rqe, res) => {
  res.render("app");
});

app.get("/consultarEmpleado/", authenticateToken, (req, res) => {
  res.render("consultaEmpleado", { user: req.user });
});

app.get("/consultar/", authenticateToken, (req, res) => {
  res.render("consultar", { user: req.user });
});

app.get("/inspeccionar/", authenticateToken, (req, res) => {
  res.render("inspeccionar", { user: req.user });
});

app.get("/almacen/", (req, res) => {
  res.render("almacen");
});

app.get("/documentos/", authenticateToken, (req, res) => {
  res.render("documentos", {user: req.user});
});

app.get("/estadisticas/",  authenticateToken, (req, res) => {
  res.render("estadisticas",{user: req.user});
});


// Ruta de para consultar la cedula de los empleados a inspeccionar.
app.get("/consultaEmpleado", authenticateToken, (req, res) => {
  res.render("consultaEmpleado", {user: req.user});
})

// Ruta para la página de login
app.get("/login", (req, res) => {
  res.render("login"); // Renderiza la vista "login.ejs"
});


app.get("/salir/", (req, res) => {
  // Eliminar la cookie que contiene el token JWT
  res.clearCookie('token');

  // Redirigir al usuario a la página de login
  res.redirect('/inicio');
});


// Ruta para la página de login
app.get("/obtenerclave", (req, res) => {
  res.render("obtenerclave"); // Renderiza la vista "login.ejs"
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
