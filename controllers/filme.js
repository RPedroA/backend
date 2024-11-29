const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Retorna todos os filmes
exports.getAll = async (req, res) => {
    const { nome, idGenero, minClassificacao, maxClassificacao } = req.query;

    try {
        // Construindo a consulta com base nos filtros fornecidos
        const filmes = await prisma.filme.findMany({
            where: {
                AND: [
                    nome ? { titulo: { contains: nome, mode: 'insensitive' } } : {},
                    idGenero ? { idGenero: parseInt(idGenero) } : {},
                    minClassificacao ? { classificacaoMedia: { gte: parseFloat(minClassificacao) } } : {},
                    maxClassificacao ? { classificacaoMedia: { lte: parseFloat(maxClassificacao) } } : {},
                ],
            },
            include: {
                genero: true, // Inclui dados do gênero se necessário
            },
        });

        // Se nenhum filme for encontrado
        if (!filmes || filmes.length === 0) {
            return res.status(404).json({ msg: "Nenhum filme encontrado com os filtros fornecidos." });
        }

        res.status(200).json(filmes);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Retorna o filme pelo ID (número do filme)
exports.getById = async (req, res) => {
    const id = parseInt(req.params.number); // Certifique-se de converter para número
    try {
        // Encontra o filme pelo ID
        const response = await prisma.filme.findUnique({
            where: { idFilme: id },
            include: {
                genero: true, // Inclui dados do gênero se necessário
            },
        });
        if (!response) {
            return res.status(404).json({ msg: "Filme não encontrado" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Cria um novo filme
exports.create = async (req, res) => {
    const { titulo, dataLancamento, descricao, duracao, idGenero } = req.body;
    try {
        // Cria um novo filme na base de dados
        const filme = await prisma.filme.create({
            data: {
                titulo,
                dataLancamento: new Date(dataLancamento), // Certifique-se de passar uma data válida
                descricao,
                duracao,
                idGenero,
            },
        });
        res.status(201).json(filme);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Atualiza um filme existente
exports.update = async (req, res) => {
    const id = parseInt(req.params.number); // Certifique-se de converter para número
    const { titulo, dataLancamento, descricao, duracao, idGenero } = req.body;

    try {
        // Atualiza o filme com base no ID
        const filme = await prisma.filme.update({
            where: { idFilme: id },
            data: {
                titulo,
                dataLancamento: new Date(dataLancamento),
                descricao,
                duracao,
                idGenero,
            },
        });
        res.status(200).json(filme);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Apaga um filme pelo ID
exports.delete = async (req, res) => {
    const id = parseInt(req.params.number); // Certifique-se de converter para número
    try {
        // Apaga o filme com base no ID
        await prisma.filme.delete({
            where: { idFilme: id },
        });
        res.status(200).send("Filme apagado com sucesso");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
