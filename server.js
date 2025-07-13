const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express();
const PORT = 3000;

app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API de lanches - retornar JSON
app.get('/api/lanches', (req, res) => {
    try {
        const lanchesData = fs.readFileSync(path.join(__dirname, 'public', 'data', 'lanches.json'), 'utf8');
        const lanches = JSON.parse(lanchesData);
        res.json(lanches);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao carregar dados dos lanches' });
    }
});

app.listen(PORT, () => {
    console.log(`🍔 Servidor da DevBurger rodando em http://localhost:${PORT}`);
});