const generoRouter = require('express').Router();
const controller = require('../controllers/genero');

// Género CRUD
generoRouter.get('/', controller.getAll); // Ler todos os géneros
generoRouter.get('/:id', controller.getById); // Ler um género pelo ID
generoRouter.post('/create', controller.create); // Criar um novo género
generoRouter.put('/update/:id', controller.update); // Atualizar um género
generoRouter.delete('/delete/:id', controller.delete); // Apagar um género

module.exports = generoRouter;
