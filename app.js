const express = require('express');
const app = express();
const PORT = 3000;


const fs = require('fs');
const path = require('path');

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

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});