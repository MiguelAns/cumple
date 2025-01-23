const session = require('express-session');
const cors = require('cors');
const express = require('express');
const path = require('path'); // Falta la importación de path
const app = express();
const port = 3000;

// Configuración de CORS
app.use(
  cors({
    origin: 'http://localhost', // Origen permitido (frontend)
    credentials: true, // Permitir el uso de cookies
  })
);

// Middlewares
app.use(express.json());

// Configuración de sesión
app.use(
  session({
    secret: 'clave-secreta', // Cambia esta clave por algo seguro
    resave: false, // No guardar sesiones si no han cambiado
    saveUninitialized: false, // No guardar sesiones vacías
    cookie: {
      httpOnly: true, // Protege contra accesos desde JavaScript
      maxAge: 60 * 60 * 1000, // Duración de la cookie (1 hora)
      sameSite: 'lax', // Permite cookies con navegación entre frontend y backend
    },
  })
);

// Simulación de una base de datos de usuarios
const users = [
  { username: 'admin', password: 'admin123', role: 'admin' }, // Administrador
  { username: 'user1', password: 'user123', role: 'user' },   // Usuario regular
];

// Ruta para inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Buscar al usuario en la lista
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    // Si el usuario existe, guardar en la sesión
    req.session.user = { username: user.username, role: user.role };
    return res.status(200).json({ message: 'Inicio de sesión exitoso', role: user.role });
  }

  // Si las credenciales no coinciden
  return res.status(401).json({ message: 'Credenciales incorrectas' });
});

// Ruta para verificar la sesión
app.get('/session', (req, res) => {
  if (req.session.user) {
    return res.status(200).json(req.session.user);
  }
  res.status(401).json({ message: 'No autenticado' });
});

// Ruta protegida para administración
app.post('/admin/data', (req, res) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return res.status(200).json({ message: 'Acción permitida: Modificación realizada' });
  }
  res.status(403).json({ message: 'Acceso denegado' });
});

// Ruta para cerrar sesión
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
    res.clearCookie('connect.sid');
    return res.status(200).json({ message: 'Sesión cerrada con éxito' });
  });
});

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});



