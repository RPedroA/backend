const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Retorna todos os utilizadores
exports.getAll = async (req, res) => {
    try {
        const utilizadores = await prisma.utilizador.findMany();
        res.status(200).json(utilizadores);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Retorna o utilizador pelo ID
exports.getById = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const utilizador = await prisma.utilizador.findUnique({
            where: { idUtilizador: id },
        });
        res.status(200).json(utilizador);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

// Cria um novo utilizador
exports.create = async (req, res) => {
    const { nome, email, password } = req.body;
    try {
        const utilizador = await prisma.utilizador.create({
            data: { nome, email, password },
        });
        res.status(201).json(utilizador);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Atualiza um utilizador
exports.update = async (req, res) => {
    const id = Number(req.params.id);
    const { nome, email, password } = req.body;
    try {
        const utilizador = await prisma.utilizador.update({
            where: { idUtilizador: id },
            data: { nome, email, password },
        });
        res.status(200).json(utilizador);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

exports.delete = async (req, res) => {
    const id = Number(req.params.id); // Certifique-se de que o ID seja convertido para número
    try {
        // Verifica se o utilizador existe
        const utilizadorExistente = await prisma.utilizador.findUnique({
            where: { idUtilizador: id }
        });

        // Se o utilizador não existir, não há nada a excluir
        if (!utilizadorExistente) {
            return res.status(404).json({ msg: "Utilizador não encontrado." });
        }

        // 1. Excluir as classificações associadas ao utilizador
        await prisma.classificacao.deleteMany({
            where: { idUtilizador: id }
        });

        // 2. Excluir as relações de filmes associadas às listas do utilizador
        await prisma.listaFilme.deleteMany({
            where: { lista: { idUtilizador: id } }
        });

        // 3. Excluir as relações de séries associadas às listas do utilizador
        await prisma.listaSerie.deleteMany({
            where: { lista: { idUtilizador: id } }
        });

        // 4. Excluir as listas associadas ao utilizador
        await prisma.lista.deleteMany({
            where: { idUtilizador: id }
        });

        // 5. Excluir o calendário associado ao utilizador
        await prisma.calendario.deleteMany({
            where: { idUtilizador: id }
        });

        // 6. Excluir o utilizador
        await prisma.utilizador.delete({
            where: { idUtilizador: id }
        });

        res.status(200).json({ msg: "Utilizador e suas dependências excluídos com sucesso." });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
