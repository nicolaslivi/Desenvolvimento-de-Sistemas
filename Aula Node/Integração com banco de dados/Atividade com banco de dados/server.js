const express = require('express');
const app = express();
const port = 3001;

//usa o formato json nas reqs - middleware
app.use(express.json());

const db = require('./db');

//1- Tarefas: busca todas as tarefas
app.get('/tarefas', async (req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM aula_api_db.tarefas');
        res.json(rows);
    } catch(error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).send('Erro interno do servidor ao buscar tarefas.');
    }
});

app.listen(port, () => console.log(`Rodando aqui http://localhost:${port}`));
