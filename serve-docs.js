const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from docs directory
app.use(express.static(path.join(__dirname, 'docs')));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Catálogo de móveis disponível!');
});