const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Retorna todas as séries com base nos filtros fornecidos
exports.getAll = async (req, res) => {
    const { titulo, idGenero, minClassificacao, maxClassificacao } = req.query;

    try {
        const series = await prisma.series.findMany({
            where: {
                AND: [
                    titulo ? { titulo: { contains: titulo, mode: 'insensitive' } } : {}, // Filtra por título (case-insensitive)
                    idGenero ? { idGenero: parseInt(idGenero) } : {}, // Filtra por gênero
                    minClassificacao ? { classificacaoMedia: { gte: parseFloat(minClassificacao) } } : {}, // Filtra por classificação mínima
                    maxClassificacao ? { classificacaoMedia: { lte: parseFloat(maxClassificacao) } } : {}, // Filtra por classificação máxima
                ],
            },
        });

        if (!series || series.length === 0) {
            return res.status(404).json({ msg: "Nenhuma série encontrada com os filtros fornecidos." });
        }

        res.status(200).json(series); // Retorna as séries filtradas
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Retorna uma série pelo ID
exports.getById = async (req, res) => {
    const id = Number(req.params.id); // Obtém o ID da série a partir dos parâmetros
    try {
        const serie = await prisma.series.findUnique({
            where: { idSerie: id },
        });
        if (!serie) {
            return res.status(404).json({ msg: "Série não encontrada." });
        }
        res.status(200).json(serie); // Retorna a série encontrada
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Cria uma nova série
exports.create = async (req, res) => {
    const { titulo, dataLancamento, dataFim, descricao, idGenero } = req.body;
    try {
        const serie = await prisma.series.create({
            data: {
                titulo,
                dataLancamento: new Date(dataLancamento), // Converte para data válida
                dataFim: new Date(dataFim), // Converte para data válida
                descricao,
                idGenero,
            },
        });
        res.status(201).json(serie); // Retorna a série criada
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Atualiza uma série existente
exports.update = async (req, res) => {
    const id = Number(req.params.id); // Obtém o ID da série a partir dos parâmetros
    const { titulo, dataLancamento, dataFim, descricao, idGenero } = req.body;

    try {
        const serie = await prisma.series.update({
            where: { idSerie: id },
            data: {
                titulo,
                dataLancamento: new Date(dataLancamento), // Converte para data válida
                dataFim: new Date(dataFim), // Converte para data válida
                descricao,
                idGenero,
            },
        });
        res.status(200).json(serie); // Retorna a série atualizada
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Apaga uma série pelo ID
exports.delete = async (req, res) => {
    const id = Number(req.params.id); // Obtém o ID da série a partir dos parâmetros
  
    if (isNaN(id)) {
      return res.status(400).json({ msg: 'ID inválido' });
    }
  
    try {
      // Primeiro, obtenha as temporadas associadas à série
      const temporadas = await prisma.temporada.findMany({
        where: { idSerie: id },
        select: { idTemporada: true },
      });
  
      if (temporadas.length === 0) {
        return res.status(404).json({ msg: 'Nenhuma temporada encontrada para esta série.' });
      }
  
      console.log('Temporadas encontradas:', temporadas);
  
      // Exclui os episódios associados às temporadas
      const episodioDeleteResult = await prisma.episodio.deleteMany({
        where: {
          idTemporada: {
            in: temporadas.map(t => t.idTemporada),
          },
        },
      });
  
      console.log('Episódios excluídos:', episodioDeleteResult);
  
      // Exclui as temporadas associadas à série
      const temporadaDeleteResult = await prisma.temporada.deleteMany({
        where: { idSerie: id },
      });
  
      console.log('Temporadas excluídas:', temporadaDeleteResult);
  
      // Agora, exclui a série
      const serieDeleteResult = await prisma.series.delete({
        where: { idSerie: id },
      });
  
      console.log('Série excluída:', serieDeleteResult);
  
      res.status(200).json({ msg: 'Série, e as suas temporadas e episódios deletados com sucesso', response: serieDeleteResult });
    } catch (error) {
      console.error('Erro durante a exclusão:', error);
      res.status(400).json({ msg: error.message });
    }
  };
  