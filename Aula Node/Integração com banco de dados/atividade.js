const express = require('express');
const app = express();
const port = 3000;

//usa o formato json nas reqs - middleware
app.use(express.json());

const db = require('./db');

//2- Fazer a busca por todos as tarefas.
app.get('/tarefas', async (req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM tarefas');
        res.json(rows);
    } catch(error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).send('Erro interno do servidor ao buscar tarefas.');
    }
});

//3- Fazer a busca pela tarefa por id.
app.get('/tarefas/:id', async (req, res) => {
    const id = parseInt(req.params.id);
  
    if (isNaN(id)) {
      return res.status(400).send('ID inválido. O ID deve ser um número.');
    }
  
    try {
      const [rows] = await db.query('SELECT * FROM tarefas WHERE id = ?', [id]);
  
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).send('Tarefa não encontrada.');
      }
    } catch (error) {
      console.error(`Erro ao buscar tarefa com ID ${id}:`, error);
      res.status(500).send('Erro interno do servidor ao buscar tarefa.');
    }
  });

//4-Inserir uma tarefa com o titulo “Exercícios” e descrição “Realizar os exercícios propostos em sala de aula”
app.post('/tarefas', async (req, res) => {
    const { titulo, descricao, concluida } = req.body;
  
    if (!titulo) {
      return res.status(400).send('O título da tarefa é obrigatório.');
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

//5- Verificar o status das tarefas com titulo “Exercícios”
app.get('/status', async (req, res) => {
    const {status} = req.query;
    try{
        const [rows] = await db.query ('SELECT concluida FROM tarefas WHERE titulo = ?', [status]);
        res.send(rows);
    } catch (error) {
        console.error(`Erro ao buscar ${status} em Tarefas!`);
        res.status(500).send(`Erro interno do servidor ao buscar ${status}`);
    }
});

//6- Alterar o status da tarefa com o titulo “Exercícios” e descrição “Realizar os exercícios propostos em sala de aula” para concluído.
app.patch('/tarefas/status/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const [tarefas] = await db.query('SELECT * FROM tarefas');

        const [troca] = await db.query ('UPDATE tarefas SET concluida = true WHERE id = ?;', [id]);

        res.status(200).json(tarefas[id - 1]);
    } catch (error) {
        console.error(`Erro ao buscar ${id} em Tarefas!`);
        res.status(500).send(`Erro interno do servidor ao buscar ${id}`);
    }
});

//7- Deletar uma das tarefas criadas.
app.delete('/tarefas/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send('ID inválido. O ID deve ser um número.');
    }
    try {
      const [result] = await db.query('DELETE FROM tarefas WHERE id = ?', [id]);
      if (result.affectedRows > 0) {
        res.status(204).send();
      } else {
        res.status(404).send('Tarefa não encontrada para exclusão.');
      }
    } catch (error) {
      console.error(`Erro ao excluir tarefa com ID ${id}:`, error);
      res.status(500).send('Erro interno do servidor ao excluir tarefa.');
    }
});

//8- Faça uma busca por todas as tarefas que tenham a palavra exercício em qualquer parte do titulo.
app.get('/tarefas/:titulo', async (req, res) => {
    const titulo = req.params.titulo;
    try {
        
    } catch (error) {
        
    }
});

app.listen(port, () => console.log(`Rodando aqui http://localhost:${port}`));       