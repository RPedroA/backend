const filmeRouter = require('express').Router();
const controller = require('../controllers/filme');

//students CRUD
filmeRouter.get('/', controller.getAll); //read all
filmeRouter.get('/:number', controller.getById); //read one by his id (filme number)
filmeRouter.post('/create', controller.create); //create new filme
filmeRouter.put('/update/:number', controller.update); //update filme
filmeRouter.delete('/delete/:number', controller.delete); //delete filme
module.exports = filmeRouter;
