const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um novo calendário
exports.createCalendar = async (req, res) => {
    const { dataEvento, lembrete, idFilme, idEpisodio, idUtilizador } = req.body;

    if (!idUtilizador) {
        return res.status(400).json({ msg: 'O campo idUtilizador é obrigatório.' });
    }

    try {
        const calendario = await prisma.calendario.create({
            data: {
                dataEvento,
                lembrete,
                idFilme,
                idEpisodio,
                idUtilizador: Number(idUtilizador), // idUtilizador agora deve ser enviado no corpo da requisição
            },
        });
        res.status(201).json(calendario);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Atualizar um calendário
exports.updateCalendar = async (req, res) => {
    const { id } = req.params;  // id aqui refere-se ao parâmetro da URL, que é o idCalendario
    const { dataEvento, lembrete, idFilme, idEpisodio, idUtilizador } = req.body;

    if (!idUtilizador) {
        return res.status(400).json({ msg: 'O campo idUtilizador é obrigatório.' });
    }

    try {
        const calendario = await prisma.calendario.update({
            where: { idCalendario: Number(id) },  // Altere "id" para "idCalendario"
            data: { dataEvento, lembrete, idFilme, idEpisodio, idUtilizador: Number(idUtilizador) },
        });
        res.status(200).json(calendario);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


// Listar calendários de um utilizador
exports.getUserCalendars = async (req, res) => {
    const { idUtilizador } = req.params;

    if (!idUtilizador) {
        return res.status(400).json({ msg: 'O campo idUtilizador é obrigatório.' });
    }

    try {
        const calendarios = await prisma.calendario.findMany({
            where: { idUtilizador: Number(idUtilizador) },
        });
        res.status(200).json(calendarios);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Apagar um calendário
exports.deleteCalendar = async (req, res) => {
    const { id } = req.params;  // id aqui refere-se ao parâmetro da URL, que é o idCalendario

    try {
        await prisma.calendario.delete({
            where: { idCalendario: Number(id) },  // Altere "id" para "idCalendario"
        });
        res.status(200).json({ msg: 'Calendário apagado com sucesso.' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
