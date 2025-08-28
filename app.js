const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir solo GET
app.all('*', (req, res, next) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Método no permitido. Solo GET está disponible.');
  }
  next();
});

// Ruta principal
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de insectos. Visita /especies para ver los datos.');
});

// Ruta para leer especies desde db.json
app.get('/especies', (req, res) => {
  const dbPath = path.join(__dirname, 'db.json');
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudo leer db.json' });
    }
    try {
      const especies = JSON.parse(data);
      res.json(especies);
    } catch (parseErr) {
      res.status(500).json({ error: 'Error al parsear db.json' });
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
