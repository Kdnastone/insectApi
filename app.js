// Declarar las constantes
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Middleware global para permitir solo GET
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
  const filePath = path.join(__dirname, 'db.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer la base de datos.');
    }
    try {
      const especies = JSON.parse(data);
      res.json(especies);
    } catch (parseError) {
      res.status(500).send('Error al procesar los datos.');
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
