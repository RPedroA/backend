const express = require('express');
const pessoaFilmeRouter = express.Router();
const controller = require('../controllers/pessoaFilme');

pessoaFilmeRouter.post('/add', controller.addPessoaToFilme); // Adiciona pessoa ao filme
pessoaFilmeRouter.delete('/remove', controller.removePessoaFromFilme); // Remove pessoa do filme
pessoaFilmeRouter.get('/filmes/:idPessoa', controller.getFilmesByPessoa); // Lista filmes de uma pessoa
pessoaFilmeRouter.get('/pessoas/:idFilme', controller.getPessoasByFilme); // Lista pessoas de um filme

module.exports = pessoaFilmeRouter;
