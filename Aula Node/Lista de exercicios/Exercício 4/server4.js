const express = require('express');
const app = express();
const port = 3004;

//usa o formato json nas reqs - middleware
app.use(express.json());

//aqui vai o exercício


//aparece no terminal com o link para abrir o servidor na web
app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});