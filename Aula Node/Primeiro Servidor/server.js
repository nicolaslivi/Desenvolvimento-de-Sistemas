const express = require('express');
const app = express();
const port = 3000;

//usa o formato json nas reqs - middleware
app.use(express.json());

let usuarios = [
    //objetos no formato JSON
    {id: 1, nome: "Nicolas", idade: 20},
    {id: 2, nome: "Gabriel", idade: 20}
];

//o próximo id de usuário
let nextId = 3;

//Get all - buscar todos os usuários 
app.get("/usuarios", (req, res) => {
    res.send(usuarios);
});

//get by id - buscar usuário por id
app.get("/usuarios/:id", (req, res) => {
    //pegar o id na requisição
    const id = parseInt(req.params.id);
    //usa o find para encontrar o usuário pelo id
    // u - é uma variável para usuários, u.id pega o id desse usuário 
    const usuario = usuarios.find(u => u.id === id);
    //caso o usuário não seja encontrado 
    if(!usuario){
        res.status(404).send("Usuário não encontrado!");
    }
    res.status(200).send(usuario);
});

//Post - criar usuário
app.post("/usuarios", (req, res) => {
    let novoUsuario = req.body; //recebe o novo usuário do body

    if (!novoUsuario.nome || novoUsuario.idade <= 0){
        res.status(400).send("E necessario preencher idade e nome!");
    }; //verifica se foi digitado nome e idade e se a idade é menor ou igual a zero

    novoUsuario.id = nextId ++; //adiciona um id para o usuário e adiciona mais um, para autoicrementar o id
    usuarios.push(novoUsuario); // coloca o novoUsuario no vetor usuarios
    res.status(201).send(novoUsuario); // mostra o novo usuário e da o status de "criado com sucesso"
});

//Put - atualizar usuário
app.put("/usuarios/:id", (req, res) => {
    let novosDados = req.body;
    const id = parseInt(req.params.id);

    if (!novosDados.nome || novosDados.idade <= 0){
        res.status(400).send("E necessario preencher idade e nome!");
    };

    novosDados.id = id;
    const index = usuarios.findIndex(u => u.id === id);

    if(!index){
        res.status(404).send("Usuario nao encontrado!");
    };

    usuarios[index] = novosDados;
    res.status(204).send();

});

//Delete - remover usuario
app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);

    if(index == -1){
        res.status(404).send("Usuario nao encontrado!");
    };
    
    usuarios.splice(index, 1);
    res.status(204).send();
});

//opcional
app.get("/", (req, res) => {
    res.send("olá!");
});

app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});