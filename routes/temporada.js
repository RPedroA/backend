const temporadaRouter = require('express').Router();
const controller = require('../controllers/temporada');

// Temporada CRUD
temporadaRouter.get('/', controller.getAll); // Ler todas as temporadas
temporadaRouter.get('/:id', controller.getById); // Ler uma temporada pelo ID
temporadaRouter.post('/create', controller.create); // Criar uma nova temporada
temporadaRouter.put('/update/:id', controller.update); // Atualizar uma temporada
temporadaRouter.delete('/delete/:id', controller.delete); // Apagar uma temporada

module.exports = temporadaRouter;
