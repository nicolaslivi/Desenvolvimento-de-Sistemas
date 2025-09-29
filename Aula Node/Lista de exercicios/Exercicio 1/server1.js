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



//aparece no terminal com o link para abrir o servidor na web
app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});