const express = require('express');
const app = express();
const port = 3003;

//usa o formato json nas reqs - middleware
app.use(express.json());

//aqui vai o exercício
let posts = [
    { id: 1, titulo: 'Primeiro Post', conteudo: 'ola', autor: 'Nicolas'},
    { id: 2, titulo: 'Segundo Post', conteudo: 'tchau', autor: 'Julia'}
];

//novo ID a ser incrementado
let nextId = 3;

//criando um novo post
app.post('/posts', (req, res) => {
    //recebendo novo post no body
    let novoPost = req.body;
    //verificando se os conteudos a serem adicionados existem e estão preenchidos
    if(!novoPost.titulo || !novoPost.conteudo || !novoPost.autor){
        res.status(400).send('Necessario informar titulo, conteudo e autor para criar um post!');//status 400- bad request (má requisição)
    }
});

//aparece no terminal com o link para abrir o servidor na web
app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});