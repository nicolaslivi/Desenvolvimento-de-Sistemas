const express = require('express');
const app = express();
const port = 3002;

//usa o formato json nas reqs - middleware
app.use(express.json());

//aqui vai o exercício
//array de produtos
let produtos = [
    {id: 1, nome: 'Teclado mecanico gamer', preco: 350.00, emEstoque: true},
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
    res.status(200).send(estoque);
});

//pesquisa os produtos pelo nome
app.get('/produtos/pesquisar', (req, res) => {
    //pego o nome a partir de um query da minha url
    //exemplo: ...?nome=gamer - vai buscar todos os produtos que possuem 'gamer' no nome
    let nome = req.query.nome
    //verifica se o nome é válido
    if(!nome){
        res.status(404).send('Nome nao encontrado!');
    }
    //usando 'filter' ele retorna em um array -nomesEncontrados- todos os produtos que possuem 'gamer' no nome
    //usando .toLowerCase ele passa todoas as letras da palavra buscada para minúscula, fazendo com que maísculas e mínusculas não interfiram na busca
    //includes verifica se no parâmetro nome possui a palavra buscada, transferindo para minúscula novamente
    //o include verifica se uma palavra ou pedeço de texto existe dentro de outra palavra - ex: se 'gamer' existe dentro de 'mouse gamer'
    let nomesEncontrado = produtos.filter(n => n.nome.toLowerCase().includes(nome.toLowerCase()));
    //mostra um array com a busca
    res.send(nomesEncontrado);
}); 

//atualizar o preço de um produto
app.patch('/produtos/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let novoPreco = req.body;

    const index = produtos.findIndex(p => p.id === id);

    if(index == -1){
        res.status(404).send('Produto nao encontrado');
    } else if (!novoPreco.preco){
        res.status(400).send('Necessario informar preco');
    }

    produtos[index].preco = novoPreco.preco;

    res.status(200).send(produtos[index]);
});

//aparece no terminal com o link para abrir o servidor na web
app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});