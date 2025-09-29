const express = require('express');
const app = express();
const port = 3001;

//usa o formato json nas reqs - middleware
app.use(express.json());

//aqui vai o exercício
// array tarefas
let tarefas = [
    {id: 1, titulo: 'Estudar Express', concluida: false},
    {id: 2, titulo: 'Fazer exercícios', concluida: false}
];

//novo ID
let nextId = 3;

//retorna todas as tarefas existentes
app.get('/tarefas', (req, res) =>{
    res.send(tarefas);
});

//retorna as tarefas com base no seu ID
app.get('/tarefas/:id', (req, res) => {
    //pega o id desejado
    let id = parseInt(req.params.id);
    //pega uma das tarefas no array usando o find
    //'t' é a minha variável para tarefas
    let tarefa = tarefas.find(t => t.id === id);
    //verifica se a tarefa selecionada existe
    if(!tarefa){
        //status 404: não encontrado
        res.status(404).send('Tarefa não encontrada!');
    }
    //retorna a tarefa selecionada pelo ID
    //status 200: OK
    res.status(200).send(tarefa);
});

//cria uma nova tarefa
app.post('/tarefas', (req, res) => {
    
});

//aparece no terminal com o link para abrir o servidor na web
app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});