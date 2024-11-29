const express = require('express');
const listaFilmeRouter = express.Router();
const controller = require('../controllers/listaFilme');

listaFilmeRouter.post('/add', controller.addFilmeToLista); // Adiciona filme à lista
listaFilmeRouter.delete('/remove', controller.removeFilmeFromLista); // Remove filme da lista
listaFilmeRouter.get('/:idLista', controller.getFilmesByLista); // Lista filmes de uma lista

module.exports = listaFilmeRouter;
