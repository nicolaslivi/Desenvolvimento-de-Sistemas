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

// novo id a partir dos outros
let nextId = 4;

//retorna os produtos em estoque
app.get('/produtos/em-estoque', (req, res) => {
    //recebe o parâmetro emEstoque do array produtos na variável estoque
    let estoque = [];
    //verifica quais os produtos em estoque
    for(let x=0; x < produtos.length; x++){
        //passa pelos itens do array e verifica qual tem em estoque
        if(produtos[x].emEstoque === true){
            //pega os produtos em estoque e adiciona em um novo vetor 'estoque'
            estoque.push(produtos[x]);
        }
    }
    //mostra os itens em estoque
    res.send(estoque);
});

//pesquisa os produtos pelo nome
app.get('/produtos/pesquisar', (req, res) => {
    let nome = req.query.nome
    if(!nome){
        res.status(404).send('Nome nao encontrado!');
    }

    let nomeEncontrado = produtos.filter(n => n.nome.toLowerCase().includes(nome.toLowerCase()));

    console.log(nomeEncontrado);
}); 

//aparece no terminal com o link para abrir o servidor na web
app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});