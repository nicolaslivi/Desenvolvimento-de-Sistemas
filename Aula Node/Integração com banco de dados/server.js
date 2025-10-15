const express = require('express');
const app = express();
const port = 3306;



//aparece no terminal com o link para abrir o servidor na web
app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
});