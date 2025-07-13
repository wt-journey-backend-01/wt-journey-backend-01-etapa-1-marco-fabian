const express = require('express')
const path = require('path')

const app = express();
const PORT = 3000;

app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🍔 Servidor da DevBurger rodando em http://localhost:${PORT}`);
});