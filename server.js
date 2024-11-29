require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const Routes = require('./routes'); // Rotas Centralizadas
const authenticate = require('./middleware/authenticate'); // Importar middleware

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Apply all routes
app.use('/', Routes); 

// Server setup
const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
});

const calendarioRouter = require('./routes/calendario');

// Adicione o router de calendário
app.use('/calendario', calendarioRouter);