const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Adiciona uma pessoa a um filme
exports.addPessoaToFilme = async (req, res) => {
    const { idPessoa, idFilme } = req.body;
    try {
        const response = await prisma.pessoaFilme.create({
            data: { idPessoa, idFilme },
        });
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Remove a associação entre uma pessoa e um filme
exports.removePessoaFromFilme = async (req, res) => {
    const { idPessoa, idFilme } = req.body;
    try {
        await prisma.pessoaFilme.delete({
            where: { idPessoa_idFilme: { idPessoa, idFilme } },
        });
        res.status(200).send("Associação removida com sucesso.");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Lista todos os filmes associados a uma pessoa
exports.getFilmesByPessoa = async (req, res) => {
    const idPessoa = parseInt(req.params.idPessoa);
    try {
        const filmes = await prisma.pessoaFilme.findMany({
            where: { idPessoa },
            include: { filme: true },
        });
        res.status(200).json(filmes);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Lista todas as pessoas associadas a um filme
exports.getPessoasByFilme = async (req, res) => {
    const idFilme = parseInt(req.params.idFilme);
    try {
        const pessoas = await prisma.pessoaFilme.findMany({
            where: { idFilme },
            include: { pessoa: true },
        });
        res.status(200).json(pessoas);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
