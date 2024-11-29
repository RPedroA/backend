const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Retorna todas as pessoas
exports.getAll = async (req, res) => {
    try {
        const pessoas = await prisma.pessoa.findMany();
        res.status(200).json(pessoas);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Retorna uma pessoa pelo ID
exports.getById = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const pessoa = await prisma.pessoa.findUnique({
            where: { idPessoa: id },
        });
        res.status(200).json(pessoa);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

// Criar uma nova pessoa
exports.create = async (req, res) => {
    const { nome, papel, descricao } = req.body;

    if (!nome || !papel || !descricao) {
        return res.status(400).json({ msg: "Os campos nome, papel e descricao são obrigatórios." });
    }

    try {
        const pessoa = await prisma.pessoa.create({
            data: {
                nome: nome,
                papel: papel,
                descricao: descricao,
            },
        });
        res.status(201).json({
            msg: "Pessoa criada com sucesso.",
            pessoa,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Erro ao criar a pessoa.",
            erro: error.message,
        });
    }
};

// Atualiza uma pessoa
exports.update = async (req, res) => {
    const id = Number(req.params.id);
    const { nome, papel, descricao } = req.body;
    try {
        const pessoa = await prisma.pessoa.update({
            where: { idPessoa: id },
            data: { nome, papel, descricao },
        });
        res.status(200).json(pessoa);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Apaga uma pessoa pelo ID
exports.delete = async (req, res) => {
    const id = Number(req.params.id);
    try {
        await prisma.pessoa.delete({
            where: { idPessoa: id },
        });
        res.status(200).send("Pessoa apagada com sucesso.");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
