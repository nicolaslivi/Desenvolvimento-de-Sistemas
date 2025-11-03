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

//1- Tarefas: busca todas as tarefas de um usuário
app.get('/tarefas', async (req, res) => {
  const {id} = req.query;

  try{
      const [rows] = await db.query('SELECT FROM tarefas WHERE fk_idUsuarios = ?', [id]);
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

  //1- Tarefas: atualizando tarefa por ID
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
      const [existingRows] = await db.query('SELECT * FROM tarefas WHERE idTarefas = ?', [id]);
      if (existingRows.length === 0) {
        return res.status(404).send('Tarefa não encontrada para atualização.');
      }
  
      const query = 'UPDATE tarefas SET titulo = ?, descricao = ?, concluida = ? WHERE idTarefas = ?';
      const params = [titulo, descricao, concluida, id];
  
      const [result] = await db.query(query, params);
  
      if (result.affectedRows > 0) {
        const [updatedRows] = await db.query('SELECT * FROM tarefas WHERE idTarefas = ?', [id]);
        res.json(updatedRows[0]);
      } else {
        res.status(200).send('Tarefa atualizada, mas nenhum dado foi alterado (os dados fornecidos eram idênticos aos existentes).');
      }
    } catch (error) {
      console.error(`Erro ao atualizar tarefa com ID ${id}:`, error);
      res.status(500).send('Erro interno do servidor ao atualizar tarefa.');
    }
  });

  //1- Tarefas: apagando tarefa por ID
  app.delete('/tarefas/:id', async (req, res) => {
    const id = parseInt(req.params.id);
  
    if (isNaN(id)) {
      return res.status(400).send('ID inválido. O ID deve ser um número.');
    }
  
    try {
      const [result] = await db.query('DELETE FROM tarefas WHERE idTarefas = ?', [id]);
  
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

  //------------------------------------------------------------------------------------------------------------------------------

  //2- Categorias: listar todas as categorias
app.get('/categorias', async (req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM categorias');
        res.json(rows);
    } catch(error) {
        console.error('Erro ao buscar categorias:', error);
        res.status(500).send('Erro interno do servidor ao buscar categorias.');
    }
});

//2- Categorias: coloca uma nova categoria
app.post('/categorias', async (req, res) => {
    const { nome } = req.body;
  
    if (!nome) {
      return res.status(400).send('O nome da categoria é obrigatório.');
    }
  
    try {
      const [result] = await db.query(
        'INSERT INTO categorias (nome) VALUES (?)',
        [nome]
      );
  
      const novaCategoria = { id: result.insertId, nome };
      res.status(201).json(novaCategoria);
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      res.status(500).send('Erro interno do servidor ao criar categoria.');
    }
  });

  //2- Categorias: atualizando categoria por ID
  app.put('/categorias/:id', async (req, res) => {
    const id = parseInt(req.params.id);
  
    const { nome } = req.body;
  
    if (isNaN(id)) {
      return res.status(400).send('ID inválido. O ID deve ser um número.');
    }
  
    if (nome === undefined ) {
      return res.status(400).send('Todos os campos (nome) são obrigatórios para esta atualização.');
    }
  
    try {
      const [existingRows] = await db.query('SELECT * FROM categorias WHERE idCategorias = ?', [id]);
      if (existingRows.length === 0) {
        return res.status(404).send('Categoria não encontrada para atualização.');
      }
  
      const query = 'UPDATE categorias SET nome = ? WHERE idCategorias = ?';
      const params = [nome, id];
  
      const [result] = await db.query(query, params);
  
      if (result.affectedRows > 0) {
        const [updatedRows] = await db.query('SELECT * FROM categorias WHERE idCategorias = ?', [id]);
        res.json(updatedRows[0]);
      } else {
        res.status(200).send('Categoria atualizada, mas nenhum dado foi alterado (os dados fornecidos eram idênticos aos existentes).');
      }
    } catch (error) {
      console.error(`Erro ao atualizar categoria com ID ${id}:`, error);
      res.status(500).send('Erro interno do servidor ao atualizar categoria.');
    }
  });

  //2- Categorias: apagando categoria por ID
  app.delete('/categorias/:id', async (req, res) => {
    const id = parseInt(req.params.id);
  
    if (isNaN(id)) {
      return res.status(400).send('ID inválido. O ID deve ser um número.');
    }
  
    try {
      const [result] = await db.query('DELETE FROM categorias WHERE idCategorias = ?', [id]);
  
      if (result.affectedRows > 0) {
        res.status(204).send();
      } else {
        res.status(404).send('Categoria não encontrada para exclusão.');
      }
    } catch (error) {
      console.error(`Erro ao excluir categoria com ID ${id}:`, error);
      res.status(500).send('Erro interno do servidor ao excluir categoria.');
    }
  });

//------------------------------------------------------------------------------------------------------------------------------

//3- Dados Usuarios: busca todas os dados dos usuarios
app.get('/dadosUsuarios', async (req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM dados_usuarios');
        res.json(rows);
    } catch(error) {
        console.error('Erro ao buscar dados do usuario:', error);
        res.status(500).send('Erro interno do servidor ao buscar dados do usuario.');
    }
});

//3- Dados Usuarios: coloca um novo dado de usuário
app.post('/dadosUsuarios', async (req, res) => {
    const { biografia, url_foto, data_nascimento, telefone } = req.body;
  
    if (!biografia) {
      return res.status(400).send('A biografia do usuário é obrigatória.');
    } else if (!url_foto) {
        return res.status(400).send('A URL da foto é obrigatória.');
    } else if (!data_nascimento) {
        return res.status(400).send('A data de nascimento do usuário é obrigatória.');
    } else if (!telefone) {
        return res.status(400).send('O telefone é obrigatório.');
    }
  
    try {
      const [result] = await db.query(
        'INSERT INTO dados_usuarios (biografia, url_foto, data_nascimento, telefone) VALUES (?, ?, ?, ?)',
        [biografia, url_foto, data_nascimento, telefone]
      );
  
      const novaDados_usuarios = { id: result.insertId, biografia, url_foto, data_nascimento, telefone };
      res.status(201).json(novaDados_usuarios);
    } catch (error) {
      console.error('Erro ao criar novos dados de usuário:', error);
      res.status(500).send('Erro interno do servidor ao criar novos dados de usuário.');
    }
  });

//3- Dados Usuarios: atualiza um dado do usuário
app.put('/dadosUsuarios/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  const { biografia, url_foto, data_nascimento, telefone } = req.body;

  if (isNaN(id)) {
    return res.status(400).send('ID inválido. O ID deve ser um número.');
  }

  if (biografia === undefined || url_foto === undefined || data_nascimento === undefined || telefone === undefined ) {
    return res.status(400).send('Todos os campos (biografia, url_foto, data_nascimento e telefone) são obrigatórios para esta atualização.');
  }

  try {
    const [existingRows] = await db.query('SELECT * FROM dados_usuarios WHERE fk_idUsuarios = ?', [id]);
    if (existingRows.length === 0) {
      return res.status(404).send('Dados não encontrados para atualização.');
    }

    const query = 'UPDATE dados_usuarios SET biografia = ?, url_foto = ?, data_nascimento = ?, telefone = ? WHERE fk_idUsuarios = ?';
    const params = [biografia, url_foto, data_nascimento, telefone, id];

    const [result] = await db.query(query, params);

    if (result.affectedRows > 0) {
      const [updatedRows] = await db.query('SELECT * FROM dados_usuarios WHERE fk_idUsuarios = ?', [id]);
      res.json(updatedRows[0]);
    } else {
      res.status(200).send('Dados atualizados, mas nenhum dado foi alterado (os dados fornecidos eram idênticos aos existentes).');
    }
  } catch (error) {
    console.error(`Erro ao atualizar dados com ID de usuário ${id}:`, error);
    res.status(500).send('Erro interno do servidor ao atualizar dados do usuário.');
  }
});

//3- Dados Usuarios: deletando um dado do usuário por ID
app.delete('/dadosUsuarios/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send('ID inválido. O ID deve ser um número.');
  }

  try {
    const [result] = await db.query('DELETE FROM dados_usuarios WHERE fk_idUsuarios = ?', [id]);

    if (result.affectedRows > 0) {
      res.status(204).send();
    } else {
      res.status(404).send('Dados de usuário não encontrados para exclusão.');
    }
  } catch (error) {
    console.error(`Erro ao excluir dados do usuário com ID ${id}:`, error);
    res.status(500).send('Erro interno do servidor ao excluir dados do usuário.');
  }
});

app.listen(port, () => console.log(`Rodando aqui http://localhost:${port}`));
