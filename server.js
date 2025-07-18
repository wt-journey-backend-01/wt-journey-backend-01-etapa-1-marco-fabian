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

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;
    
    if (!nome || !email || !assunto || !mensagem) {
        return res.status(400).send(`
            <html>
                <head>
                    <title>DevBurger - Erro</title>
                </head>
                <body>
                    <h1>Erro no Contato</h1>
                    <p>Por favor, preencha todos os campos obrigatórios.</p>
                    <a href="/contato">Voltar ao contato</a>
                </body>
            </html>
        `);
    }

    res.send(`
        <html>
            <head>
                <title>DevBurger - Mensagem Enviada</title>
            </head>
            <body>
                <h1>📧 Mensagem Enviada com Sucesso!</h1>
                <h2>Detalhes da Mensagem:</h2>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Assunto:</strong> ${assunto}</p>
                <p><strong>Mensagem:</strong> ${mensagem}</p>
                <p>Sua mensagem foi recebida e responderemos em breve!</p>
                <p>
                    <a href="/">Voltar ao início</a> |
                    <a href="/contato">Enviar nova mensagem</a>
                </p>
            </body>
        </html>
    `);
});

app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;
    
    if (!nome || !ingredientes) {
        return res.status(400).send(`
            <html>
                <head>
                    <title>DevBurger - Erro</title>
                </head>
                <body>
                    <h1>Erro na Sugestão</h1>
                    <p>Por favor, preencha todos os campos necessários.</p>
                    <a href="/">Voltar ao início</a>
                </body>
            </html>
        `);
    }

    res.send(`
        <html>
            <head>
                <title>DevBurger - Sugestão Recebida</title>
            </head>
            <body>
                <h1>🍔 Obrigado pela sua sugestão!</h1>
                <h2>Detalhes da Sugestão:</h2>
                <p><strong>Nome do Lanche:</strong> ${nome}</p>
                <p><strong>Ingredientes:</strong> ${ingredientes}</p>
                <p>Sua sugestão foi recebida e será analisada pela nossa equipe!</p>
                <p>
                    <a href="/">Voltar ao início</a> |
                    <a href="/contato">Enviar mensagem</a>
                </p>
            </body>
        </html>
    `);
});

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