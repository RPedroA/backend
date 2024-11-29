const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Adiciona uma pessoa a uma série
exports.addPessoaToSerie = async (req, res) => {
    const { idPessoa, idSerie } = req.body;
    try {
        const response = await prisma.pessoaSerie.create({
            data: { idPessoa, idSerie },
        });
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Remove a associação entre uma pessoa e uma série
exports.removePessoaFromSerie = async (req, res) => {
    const { idPessoa, idSerie } = req.body;
    try {
        await prisma.pessoaSerie.delete({
            where: { idPessoa_idSerie: { idPessoa, idSerie } },
        });
        res.status(200).send("Associação removida com sucesso.");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Lista todas as séries associadas a uma pessoa
exports.getSeriesByPessoa = async (req, res) => {
    const idPessoa = parseInt(req.params.idPessoa);
    try {
        const series = await prisma.pessoaSerie.findMany({
            where: { idPessoa },
            include: { serie: true },
        });
        res.status(200).json(series);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Lista todas as pessoas associadas a uma série
exports.getPessoasBySerie = async (req, res) => {
    const idSerie = parseInt(req.params.idSerie);
    try {
        const pessoas = await prisma.pessoaSerie.findMany({
            where: { idSerie },
            include: { pessoa: true },
        });
        res.status(200).json(pessoas);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
