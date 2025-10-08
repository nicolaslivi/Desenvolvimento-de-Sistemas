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

//listar comentários de um post
app.get('/posts/:id/comentarios', (req, res) => {
    let id = parseInt(req.params.id);
    
});

//aparece no terminal com o link para abrir o servidor na web
app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});