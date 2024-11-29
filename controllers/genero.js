const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Retorna todos os géneros
exports.getAll = async (req, res) => {
    try {
        const generos = await prisma.genero.findMany();
        res.status(200).json(generos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Retorna um género pelo ID
exports.getById = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const genero = await prisma.genero.findUnique({
            where: { idGenero: id },
        });
        res.status(200).json(genero);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

// Cria um novo género
exports.create = async (req, res) => {
    const { nome, descricao } = req.body;
    try {
        const genero = await prisma.genero.create({
            data: { nome, descricao },
        });
        res.status(201).json(genero);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Atualiza um género
exports.update = async (req, res) => {
    const id = Number(req.params.id);
    const { nome, descricao } = req.body;
    try {
        const genero = await prisma.genero.update({
            where: { idGenero: id },
            data: { nome, descricao },
        });
        res.status(200).json(genero);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Apaga um género pelo ID
exports.delete = async (req, res) => {
    const id = Number(req.params.id);
    try {
        await prisma.genero.delete({
            where: { idGenero: id },
        });
        res.status(200).send("Género apagado com sucesso.");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
