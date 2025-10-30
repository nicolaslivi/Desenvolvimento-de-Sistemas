const express = require('express');
const app = express();
const port = 3001;

//usa o formato json nas reqs - middleware
app.use(express.json());

const db = require('./db');

//1- Tarefas: busca todas as tarefas
app.get('/tarefas', async (req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM tarefas');
        res.json(rows);
    } catch(error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).send('Erro interno do servidor ao buscar tarefas.');
    }
});

//1- Tarefas: coloca uma nova tarefa
app.post('/tarefas', async (req, res) => {
    const { titulo, descricao, concluida } = req.body;
  
    if (!titulo) {
      return res.status(400).send('O título da tarefa é obrigatório.');
    } else if (!descricao) {
        return res.status(400).send('A descrição da tarefa é obrigatória.');
    } else if (!concluida) {
        return res.status(400).send('O status da tarefa é obrigatório.');
    }
  
    try {
      const [result] = await db.query(
        'INSERT INTO tarefas (titulo, descricao, concluida) VALUES (?, ?, ?)',
        [titulo, descricao || null, concluida || false]
      );
  
      const novaTarefa = { id: result.insertId, titulo, descricao, concluida };
      res.status(201).json(novaTarefa);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      res.status(500).send('Erro interno do servidor ao criar tarefa.');
    }
  });

app.listen(port, () => console.log(`Rodando aqui http://localhost:${port}`));
