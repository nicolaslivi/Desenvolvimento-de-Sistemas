const express = require('express');
const app = express();
const port = 3000;

//usa o formato json nas reqs - middleware
app.use(express.json());

const db = require('./db');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/tarefas', async (req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM tarefas');
        res.json(rows);
    } catch(error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).send('Erro interno do servidor ao buscar tarefas.');
    }
});

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

  app.put('/tarefas/:id', async (req, res) => {
    const id = parseInt(req.params.id);
  
    const { titulo, descricao, concluida } = req.body;
  
    if (isNaN(id)) {
      return res.status(400).send('ID inválido. O ID deve ser um número.');
    }
  
    if (titulo === undefined && descricao === undefined && concluida === undefined) {
      return res.status(400).send('Todos os campos (título, descrição e concluída) são obrigatórios para esta atualização.');
    }
  
    try {
      const [existingRows] = await db.query('SELECT * FROM tarefas WHERE id = ?', [id]);
      if (existingRows.length === 0) {
        return res.status(404).send('Tarefa não encontrada para atualização.');
      }
  
      const query = 'UPDATE tarefas SET titulo = ?, descricao = ?, concluida = ? WHERE id = ?';
      const params = [titulo, descricao, concluida, id];
  
      const [result] = await db.query(query, params);
  
      if (result.affectedRows > 0) {
        const [updatedRows] = await db.query('SELECT * FROM tarefas WHERE id = ?', [id]);
        res.json(updatedRows[0]);
      } else {
        res.status(200).send('Tarefa atualizada, mas nenhum dado foi alterado (os dados fornecidos eram idênticos aos existentes).');
      }
    } catch (error) {
      console.error(`Erro ao atualizar tarefa com ID ${id}:`, error);
      res.status(500).send('Erro interno do servidor ao atualizar tarefa.');
    }
  });

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

app.listen(port, () => console.log(`Rodando aqui http://localhost:${port}`));