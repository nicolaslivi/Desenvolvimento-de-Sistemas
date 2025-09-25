const express = require('express');
const app = express();
const port = 3000;

const usuarios = [
    //objetos no formato JSON
    {id: 1, nome: "Nicolas", idade: 20},
    {id: 2, nome: "Gabriel", idade: 20}
];

//Get all - buscar todos os usuários 
app.get("/usuarios", (req, res) => {
    res.send(usuarios);
});

//get by id - buscar usuário por id
app.get("/usuarios/:id", (req, res) => {
    //pegar o id na requisição
    const id = parseInt(req.params.id);
    //usa o find para encontrar o usuário pelo id
    const usuario = usuarios.find(u => u.id === id);
    if(!usuario){
        res.status(404).send("Usuário não encontrado!");
    }
    res.status(200).send(usuario);
});

//opcional
app.get("/", (req, res) => {
    res.send("olá!");
});

app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});