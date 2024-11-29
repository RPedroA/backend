const episodioRouter = require('express').Router();
const controller = require('../controllers/episodio');

episodioRouter.get('/', controller.getAll); // Retorna todos os episódios
episodioRouter.get('/:id', controller.getById); // Retorna episódio por ID
episodioRouter.post('/create', controller.create); // Cria um novo episódio
episodioRouter.put('/update/:id', controller.update); // Atualiza episódio
episodioRouter.delete('/delete/:id', controller.delete); // Apaga episódio

module.exports = episodioRouter;
