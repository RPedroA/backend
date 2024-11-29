const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para atualizar a classificação média de filmes ou séries
const atualizarClassificacaoMedia = async (tipo, id) => {
    const classificacoes = await prisma.classificacao.findMany({
        where: tipo === 'filme' ? { idFilme: id } : { idSerie: id },
    });

    if (classificacoes.length > 0) {
        const media = classificacoes.reduce((acc, curr) => acc + curr.valor, 0) / classificacoes.length;

        if (tipo === 'filme') {
            await prisma.filme.update({
                where: { idFilme: id },
                data: { classificacaoMedia: media },
            });
        } else {
            await prisma.serie.update({
                where: { idSerie: id },
                data: { classificacaoMedia: media },
            });
        }
    }
};

// Retorna todas as classificações
exports.getAll = async (req, res) => {
    try {
        const classificacoes = await prisma.classificacao.findMany();
        res.status(200).json(classificacoes);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Retorna uma classificação pelo ID
exports.getById = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const classificacao = await prisma.classificacao.findUnique({
            where: { idClassificacao: id },
        });
        if (!classificacao) {
            return res.status(404).json({ msg: 'Classificação não encontrada.' });
        }
        res.status(200).json(classificacao);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Cria uma nova classificação
exports.create = async (req, res) => {
    const { valor, comentario, dataAvaliacao, idFilme, idSerie, idUtilizador } = req.body;

    // Validação do valor da classificação (deve estar entre 0 e 5)
    if (valor < 0 || valor > 5) {
        return res.status(400).json({ msg: "A classificação deve ser entre 0 e 5." });
    }

    try {
        const classificacao = await prisma.classificacao.create({
            data: {
                valor,
                comentario,
                dataAvaliacao,
                idFilme,
                idSerie,
                idUtilizador
            },
        });

        // Atualizar a classificação média do filme ou série
        if (idFilme) await atualizarClassificacaoMedia('filme', idFilme);
        if (idSerie) await atualizarClassificacaoMedia('serie', idSerie);

        res.status(201).json(classificacao);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Atualiza uma classificação
exports.update = async (req, res) => {
    const id = Number(req.params.id);
    const { valor, comentario, dataAvaliacao, idFilme, idSerie, idUtilizador } = req.body;

    // Validação do valor da classificação (deve estar entre 0 e 5)
    if (valor < 0 || valor > 5) {
        return res.status(400).json({ msg: "A classificação deve ser entre 0 e 5." });
    }

    try {
        const classificacao = await prisma.classificacao.update({
            where: { idClassificacao: id },
            data: { valor, comentario, dataAvaliacao, idFilme, idSerie, idUtilizador },
        });

        // Atualizar a classificação média do filme ou série
        if (idFilme) await atualizarClassificacaoMedia('filme', idFilme);
        if (idSerie) await atualizarClassificacaoMedia('serie', idSerie);

        res.status(200).json({ msg: 'Classificação atualizada com sucesso.' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Apaga uma classificação
exports.delete = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const classificacao = await prisma.classificacao.findUnique({ where: { idClassificacao: id } });

        if (!classificacao) {
            return res.status(404).json({ msg: 'Classificação não encontrada.' });
        }

        await prisma.classificacao.delete({ where: { idClassificacao: id } });

        // Atualizar a classificação média do filme ou série
        if (classificacao.idFilme) await atualizarClassificacaoMedia('filme', classificacao.idFilme);
        if (classificacao.idSerie) await atualizarClassificacaoMedia('serie', classificacao.idSerie);

        res.status(200).send("Classificação apagada com sucesso.");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
