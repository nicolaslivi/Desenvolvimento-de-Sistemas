const express = require('express');
const app = express();
const port = 3001;

//usa o formato json nas reqs - middleware
app.use(express.json());

//aqui vai o exercício
// array tarefas
let tarefas = [
    {id: 1, titulo: 'Estudar express', concluida: false},
    {id: 2, titulo: 'Fazer exercicios', concluida: false}
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
        res.status(404).send('Tarefa nao encontrada!');
    }
    //retorna a tarefa selecionada pelo ID
    //status 200: OK
    res.status(200).send(tarefa);
});

//cria uma nova tarefa
app.post('/tarefas', (req, res) => {
    //recebe uma nova tarefa a partir do body
    let novaTarefa = req.body;
    //verifica se foi digitado a tarefa
    if(!novaTarefa){
        //status 400: bad request
        res.status(400).send('Necessario informar o titulo');
    }
    novaTarefa.id = nextId ++; //adiciona um id para a nova tarefa e adiciona mais um, para autoicrementar o id
    tarefas.push(novaTarefa); // adiciona essa nova tarefa no array tarefas
    res.status(201).send(tarefas); //status 201: criado e mostra o array tarefas

});

//atualizar uma tarefa buscando por um ID
app.put('/tarefas/:id', (req, res) => {
    //recebe os novos a partir do corpo da requisição
    let novosDados = req.body;
    //recebe um id como parâmetro e procura no array
    let id = parseInt(req.params.id);
    //verifica se foi digitado o titulo e 'concluida'
    if(!novosDados.titulo || novosDados.concluida == null){
        res.status(400).send('Necessario preencher titulo e concluida');
    }
    //informa que o id que recebeu é o id necessário para alteração
    novosDados.id = id;
    //cria um index, que vai passar por todos os dados do array até achar um id compatível com o informado
    //'t' - é a minha variável para a tarefa que desejo alterar
    // findIndex - procura o id no array tarefas iterando sobre os dados até achar um igual
    const index = tarefas.findIndex(t => t.id === id);
    //se o id informado não foi encontrado, retorno 404
    if(index == -1){
        res.status(404).send('Tarefa nao econtrada');
    }
    //o index econtrado, é substituido por novos dados
    tarefas[index] = novosDados;
    res.status(204).send(); //status 204: aceito
});

app.delete('/tarefas/:id', (req, res) => {
    //recebe um id como parâmetro para procurar no array
    let id = parseInt(req.params.id);
    //cria um index que passsa por todos os dados do array
    const index = tarefas.findIndex(t => t.id === id);
    //se nada for encontrado no index
    if(index == -1){
        res.status(404).send('Tarefa nao econtrada');
    }
    //remove com splice do array a tarefa selecionada
    tarefas.splice(index, 1);
    res.status(204).send();// status 204: aceito
});

//aparece no terminal com o link para abrir o servidor na web
app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});