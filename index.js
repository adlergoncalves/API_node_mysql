// Importa Express
const express = require('express');
const app = express();

// Habilita uso de Json
app.use(express.json());

// Importa Roteadores
const router = require('./routes/routes');

// Chama o Roteador
app.use('/teste', router);

// Escuta a porta
app.listen(3000, () => {
    console.log("Api Started!");
});
