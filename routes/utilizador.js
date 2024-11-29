const utilizadorRouter = require('express').Router();
const controller = require('../controllers/utilizador');

// Utilizador CRUD
utilizadorRouter.get('/', controller.getAll); // Ler todos os utilizadores
utilizadorRouter.get('/:id', controller.getById); // Ler um utilizador pelo ID
utilizadorRouter.post('/create', controller.create); // Criar um novo utilizador
utilizadorRouter.put('/update/:id', controller.update); // Atualizar um utilizador
utilizadorRouter.delete('/delete/:id', controller.delete); // Apagar um utilizador

module.exports = utilizadorRouter;
