const express = require('express');
const app = express();
const port = 3001;

//usa o formato json nas reqs - middleware
app.use(express.json());

const db = require('./db');



app.listen(port, () => console.log(`Rodando aqui http://localhost:${port}`));
