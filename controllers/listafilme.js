const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Adiciona um filme a uma lista
exports.addFilmeToLista = async (req, res) => {
    const { idLista, idFilme } = req.body;
    try {
        const response = await prisma.listaFilme.create({
            data: { idLista, idFilme },
        });
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Remove um filme de uma lista
exports.removeFilmeFromLista = async (req, res) => {
    const { idLista, idFilme } = req.body;
    try {
        await prisma.listaFilme.delete({
            where: { idLista_idFilme: { idLista, idFilme } },
        });
        res.status(200).send("Filme removido da lista.");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Lista os filmes de uma lista
exports.getFilmesByLista = async (req, res) => {
    const idLista = parseInt(req.params.idLista);
    try {
        const filmes = await prisma.listaFilme.findMany({
            where: { idLista },
            include: { filme: true },
        });
        res.status(200).json(filmes);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
