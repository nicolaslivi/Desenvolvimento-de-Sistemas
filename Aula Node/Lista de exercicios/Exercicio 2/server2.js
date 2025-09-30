const express = require('express');
const app = express();
const port = 3002;

//usa o formato json nas reqs - middleware
app.use(express.json());

//aqui vai o exercício
//array de produtos
let produtos = [
    {id: 1, nome: 'Teclado mecanico', preco: 350.00, emEstoque: true},
    {id: 2, nome: 'Mouse gamer', preco: 180.00, emEstoque: false},
    {id: 3, nome: 'Monitor ultrawide', preco: 1500.00, emEstoque: true}
];

// novo id a partir dos de cima
let nextId = 4;

//retorna os produtos em estoque
app.get('/produtos/em-estoque', (req, res) => {
    //recebe o parâmetro emEstoque do array produtos na variável estoque
    let estoque = (req.params.emEstoque);
    //verifica quais os produtos em estoque
    if(estoque = true){
        
    }
});

//aparece no terminal com o link para abrir o servidor na web
app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});