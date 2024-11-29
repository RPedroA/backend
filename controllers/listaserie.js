const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Adiciona uma série a uma lista
exports.addSerieToLista = async (req, res) => {
    const { idLista, idSerie } = req.body;
    try {
        const response = await prisma.listaSerie.create({
            data: { idLista, idSerie },
        });
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Remove uma série de uma lista
exports.removeSerieFromLista = async (req, res) => {
    const { idLista, idSerie } = req.body;
    try {
        await prisma.listaSerie.delete({
            where: { idLista_idSerie: { idLista, idSerie } },
        });
        res.status(200).send("Série removida da lista.");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Lista as séries de uma lista
exports.getSeriesByLista = async (req, res) => {
    const idLista = parseInt(req.params.idLista);
    try {
        const series = await prisma.listaSerie.findMany({
            where: { idLista },
            include: { serie: true },
        });
        res.status(200).json(series);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
