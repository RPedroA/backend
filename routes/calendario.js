const express = require('express');
const calendarioRouter = express.Router();
const controller = require('../controllers/calendario'); // Controller onde as ações são feitas


// Criar um novo calendário
calendarioRouter.post('/create', controller.createCalendar);

// Atualizar um calendário existente
calendarioRouter.put('/update/:id', controller.updateCalendar);

// Listar calendários de um utilizador
calendarioRouter.get('/user/:idUtilizador', controller.getUserCalendars);

// Apagar um calendário
calendarioRouter.delete('/delete/:id',  controller.deleteCalendar);

module.exports = calendarioRouter;
