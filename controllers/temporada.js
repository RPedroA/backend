const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Retorna todas as temporadas
exports.getAll = async (req, res) => {
    try {
        const temporadas = await prisma.temporada.findMany();
        res.status(200).json(temporadas);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Retorna uma temporada pelo ID
exports.getById = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const temporada = await prisma.temporada.findUnique({
            where: { idTemporada: id },
        });
        res.status(200).json(temporada);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

exports.create = async (req, res) => {
    const { nTemporada, dataLancamento, idSerie } = req.body;

    try {
        // Verifica se a série com o idSerie existe
        const serieExistente = await prisma.Series.findUnique({
            where: { idSerie: idSerie },  // Certifique-se de que "Series" está correto
        });

        if (!serieExistente) {
            return res.status(400).json({ msg: 'Série não encontrada com o ID fornecido.' });
        }

        // Converte dataLancamento para o formato ISO-8601
        const dataFormatada = new Date(dataLancamento).toISOString();

        // Criação da temporada
        const temporada = await prisma.temporada.create({
            data: {
                nTemporada,
                dataLancamento: dataFormatada,  // Usa a data formatada corretamente
                idSerie,  // Usa o idSerie válido
            },
        });

        res.status(201).json(temporada);  // Retorna a temporada criada
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

//Atualizar temporada
exports.update = async (req, res) => {
    const id = Number(req.params.id);
    const { nTemporada, dataLancamento, idSerie } = req.body;

    try {
        // Verifica se a série com o idSerie existe
        const serieExistente = await prisma.Series.findUnique({
            where: { idSerie: idSerie },
        });

        if (!serieExistente) {
            return res.status(400).json({ msg: 'Série não encontrada com o ID fornecido.' });
        }

        // Converte a data para ISO-8601
        const dataFormatada = new Date(dataLancamento).toISOString(); // Garante que a data seja no formato correto

        // Atualiza a temporada
        const temporada = await prisma.temporada.update({
            where: { idTemporada: id },  // Usamos o ID da temporada para a atualização
            data: {
                nTemporada,
                dataLancamento: dataFormatada,  // A data formatada
                idSerie,  // Atualiza com o id da série
            },
        });

        res.status(200).json(temporada);  // Retorna a temporada atualizada
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

//apaga a temporada
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
