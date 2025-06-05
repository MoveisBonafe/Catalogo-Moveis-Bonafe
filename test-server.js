const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('docs'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.get('/gestao', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'gestao.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor de teste rodando em http://localhost:${PORT}`);
  console.log(`Catálogo: http://localhost:${PORT}`);
  console.log(`Gestão: http://localhost:${PORT}/gestao.html`);
});