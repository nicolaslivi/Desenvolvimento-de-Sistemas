const express = require('express');
const app = express();
const port = 3004;

//usa o formato json nas reqs - middleware
app.use(express.json());

//aqui vai o exercício
let comentarios = [
    { id: 1, post_id: 1, texto: "topzera!"},
    { id: 2, post_id: 2, texto: "bacana!"}
];

let nextId = 3;

//listar comentários de um post
app.get('/posts/:id/comentarios', (req, res) => {
    let id = parseInt(req.params.id);
    const index = comentarios.findIndex(c => c.post_id === id);
     //verifico se o id é válido
     if(index == -1){
        res.status(404).send('Post nao encontrado!');//404- not found
    }
    res.status(200).send(comentarios[index].texto);
});

//cria um novo comentário em um post específico
app.post('/posts/:id/comentarios', (req, res) => {
    let id = parseInt(req.params.id);
     //verifico se o id é válido
     const index = comentarios.findIndex(c => c.post_id === id);
     if(index == -1){
        res.status(404).send('Post nao encontrado!');//404- not found
    }
    let novoComentario = req.body;
    novoComentario.post_id = id;
    novoComentario.id = nextId++;
    comentarios.push(novoComentario);
    res.status(201).send(comentarios);
});

//remove um comentário
app.delete('/comentarios/:id', (req, res) => {
    let id = parseInt(req.params.id);
    const index = comentarios.findIndex(c => c.id === id);
    if(index == -1){
        res.status(404).send('Comentario nao encontrado!');//404- not found
    }
    comentarios.splice(index, 1);
    res.status(200).send(comentarios);
});

//aparece no terminal com o link para abrir o servidor na web
app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});