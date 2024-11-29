const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Retorna todos os episódios
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.episodio.findMany({
            include: { temporada: true }, // Inclui informações da temporada associada
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Retorna um episódio pelo ID
exports.getById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const response = await prisma.episodio.findUnique({
            where: { idEpisodio: id },
            include: { temporada: true },
        });
        if (!response) return res.status(404).json({ msg: "Episódio não encontrado" });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

// Cria um novo episódio
exports.create = async (req, res) => {
    const { titulo, nEpisodio, duracao, dataLancamento, idTemporada } = req.body;
    try {
        const response = await prisma.episodio.create({
            data: { titulo, nEpisodio, duracao, dataLancamento, idTemporada },
        });
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Atualiza um episódio
exports.update = async (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, nEpisodio, duracao, dataLancamento, idTemporada } = req.body;
    try {
        const response = await prisma.episodio.update({
            where: { idEpisodio: id },
            data: { titulo, nEpisodio, duracao, dataLancamento, idTemporada },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

exports.delete = async (req, res) => {
    const id = Number(req.params.id); // Obtém o ID da temporada
    try {
        // Exclui todos os episódios associados à temporada
        await prisma.episodio.deleteMany({
            where: { idTemporada: id },
        });

        // Exclui a temporada
        await prisma.temporada.delete({
            where: { idTemporada: id },
        });

        res.status(200).send("Temporada e episódios deletados com sucesso.");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
