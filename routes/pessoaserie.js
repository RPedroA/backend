const express = require('express');
const pessoaSerieRouter = express.Router();
const controller = require('../controllers/pessoaSerie');

pessoaSerieRouter.post('/add', controller.addPessoaToSerie); // Adiciona pessoa à série
pessoaSerieRouter.delete('/remove', controller.removePessoaFromSerie); // Remove pessoa da série
pessoaSerieRouter.get('/series/:idPessoa', controller.getSeriesByPessoa); // Lista séries de uma pessoa
pessoaSerieRouter.get('/pessoas/:idSerie', controller.getPessoasBySerie); // Lista pessoas de uma série

module.exports = pessoaSerieRouter;
