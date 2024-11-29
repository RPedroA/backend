const pessoaRouter = require('express').Router();
const controller = require('../controllers/pessoa');

// Pessoa CRUD
pessoaRouter.get('/', controller.getAll); // Ler todas as pessoas
pessoaRouter.get('/:id', controller.getById); // Ler uma pessoa pelo ID
pessoaRouter.post('/create', controller.create); // Criar uma nova pessoa
pessoaRouter.put('/update/:id', controller.update); // Atualizar uma pessoa
pessoaRouter.delete('/delete/:id', controller.delete); // Apagar uma pessoa

module.exports = pessoaRouter;
