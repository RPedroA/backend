const seriesRouter = require('express').Router();
const controller = require('../controllers/series');

// Série CRUD
seriesRouter.get('/', controller.getAll); // Ler todas as séries
seriesRouter.get('/:id', controller.getById); // Ler uma série pelo ID
seriesRouter.post('/create', controller.create); // Criar uma nova série
seriesRouter.put('/update/:id', controller.update); // Atualizar uma série
seriesRouter.delete('/delete/:id', controller.delete); // Apagar uma série

module.exports = seriesRouter;
