const express = require('express');
const listaSerieRouter = express.Router();
const controller = require('../controllers/listaSerie');

// Rota para adicionar uma série à lista
listaSerieRouter.post('/add', controller.addSerieToLista); // Adiciona série à lista

// Rota para remover uma série de uma lista
listaSerieRouter.delete('/remove', controller.removeSerieFromLista); // Remove série da lista

// Rota para listar todas as séries de uma lista
listaSerieRouter.get('/:idLista', controller.getSeriesByLista); // Lista séries de uma lista

module.exports = listaSerieRouter;
