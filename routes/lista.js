const express = require('express');
const listaRouter = express.Router();
const controller = require('../controllers/lista'); // Importa o controller da lista

// Criar uma nova lista
listaRouter.post('/create', controller.createList);

// Obter todas as listas de um utilizador específico
listaRouter.get('/user/:idUtilizador', controller.getListsByUser);

// Atualizar uma lista existente
listaRouter.put('/update/:id', controller.updateList);

// Deletar uma lista
listaRouter.delete('/delete/:id', controller.deleteList);

module.exports = listaRouter;
