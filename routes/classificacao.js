const classificacaoRouter = require('express').Router();
const controller = require('../controllers/classificacao');

// Classificação CRUD
classificacaoRouter.get('/', controller.getAll); // Ler todas as classificações
classificacaoRouter.get('/:id', controller.getById); // Ler uma classificação pelo ID
classificacaoRouter.post('/create', controller.create); // Criar uma nova classificação
classificacaoRouter.put('/update/:id', controller.update); // Atualizar uma classificação
classificacaoRouter.delete('/delete/:id', controller.delete); // Apagar uma classificação

module.exports = classificacaoRouter;
