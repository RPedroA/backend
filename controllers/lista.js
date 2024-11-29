const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar uma nova lista
exports.createList = async (req, res) => {
    const { nome, filmes = [], series = [], idUtilizador } = req.body;

    try {
        // Verificar se os filmes existem
        const filmesExistentes = await prisma.filme.findMany({
            where: { idFilme: { in: filmes } },
        });
        const idsFilmesValidos = filmesExistentes.map((f) => f.idFilme);

        // Verificar se as séries existem
        const seriesExistentes = await prisma.series.findMany({
            where: { idSerie: { in: series } },
        });
        const idsSeriesValidos = seriesExistentes.map((s) => s.idSerie);

        // Criar a lista
        const lista = await prisma.lista.create({
            data: {
                nome,
                idUtilizador,
                dataCriacao: new Date(),
                filmes: {
                    create: idsFilmesValidos.map((idFilme) => ({
                        filme: { connect: { idFilme } },
                    })),
                },
                series: {
                    create: idsSeriesValidos.map((idSerie) => ({
                        serie: { connect: { idSerie } },
                    })),
                },
            },
            include: {
                filmes: { include: { filme: true } },
                series: { include: { serie: true } },
            },
        });

        res.status(201).json(lista);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar lista.', details: error.message });
    }
};

// Obter todas as listas de um utilizador específico
exports.getListsByUser = async (req, res) => {
    const { idUtilizador } = req.params;

    try {
        const listas = await prisma.lista.findMany({
            where: { idUtilizador: Number(idUtilizador) },
            include: {
                filmes: { include: { filme: true } },
                series: { include: { serie: true } },
            },
        });

        res.status(200).json(listas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar listas.', details: error.message });
    }
};

exports.updateList = async (req, res) => {
    const { id } = req.params; // ID da lista
    const { nome, filmes = [], series = [] } = req.body;

    try {
        // Verificar se a lista existe
        const listaExistente = await prisma.lista.findUnique({
            where: { idLista: Number(id) },
        });

        if (!listaExistente) {
            return res.status(404).json({ error: "Lista não encontrada." });
        }

        // Verificar se os filmes existem
        const filmesExistentes = await prisma.filme.findMany({
            where: { idFilme: { in: filmes } },
        });
        const idsFilmesValidos = filmesExistentes.map((f) => f.idFilme);

        // Verificar se as séries existem
        const seriesExistentes = await prisma.series.findMany({
            where: { idSerie: { in: series } },
        });
        const idsSeriesValidos = seriesExistentes.map((s) => s.idSerie);

        // Atualizar a lista
        const listaAtualizada = await prisma.lista.update({
            where: { idLista: Number(id) },
            data: {
                nome,
                filmes: {
                    deleteMany: {}, // Remove todas as associações antigas
                    create: idsFilmesValidos.map((idFilme) => ({
                        filme: { connect: { idFilme } },
                    })),
                },
                series: {
                    deleteMany: {}, // Remove todas as associações antigas
                    create: idsSeriesValidos.map((idSerie) => ({
                        serie: { connect: { idSerie } },
                    })),
                },
            },
            include: {
                filmes: { include: { filme: true } },
                series: { include: { serie: true } },
            },
        });

        res.status(200).json(listaAtualizada);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar lista.', details: error.message });
    }
};


exports.deleteList = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar se a lista existe
        const listaExistente = await prisma.lista.findUnique({
            where: { idLista: Number(id) },
        });

        if (!listaExistente) {
            return res.status(404).json({ error: "Lista não encontrada." });
        }

        // Remover associações de filmes na lista
        await prisma.listaFilme.deleteMany({
            where: { idLista: Number(id) },
        });

        // Remover associações de séries na lista
        await prisma.listaSerie.deleteMany({
            where: { idLista: Number(id) },
        });

        // Remover compartilhamentos da lista
        await prisma.listaCompartilhamento.deleteMany({
            where: { idLista: Number(id) },
        });

        // Excluir a lista
        await prisma.lista.delete({
            where: { idLista: Number(id) },
        });

        res.status(200).json({ message: "Lista excluída com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar lista.", details: error.message });
    }
};
