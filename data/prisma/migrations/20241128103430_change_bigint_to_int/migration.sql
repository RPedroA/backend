-- CreateTable
CREATE TABLE "Filme" (
    "idFilme" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "dataLancamento" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "idGenero" INTEGER NOT NULL,

    CONSTRAINT "Filme_pkey" PRIMARY KEY ("idFilme")
);

-- CreateTable
CREATE TABLE "Utilizador" (
    "idUtilizador" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Utilizador_pkey" PRIMARY KEY ("idUtilizador")
);

-- CreateTable
CREATE TABLE "Genero" (
    "idGenero" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("idGenero")
);

-- CreateTable
CREATE TABLE "Series" (
    "idSerie" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "dataLancamento" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "idGenero" INTEGER NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("idSerie")
);

-- CreateTable
CREATE TABLE "Temporada" (
    "idTemporada" SERIAL NOT NULL,
    "nTemporada" INTEGER NOT NULL,
    "dataLancamento" TIMESTAMP(3) NOT NULL,
    "idSerie" INTEGER NOT NULL,

    CONSTRAINT "Temporada_pkey" PRIMARY KEY ("idTemporada")
);

-- CreateTable
CREATE TABLE "Episodio" (
    "idEpisodio" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "nEpisodio" INTEGER NOT NULL,
    "duracao" INTEGER NOT NULL,
    "dataLancamento" TIMESTAMP(3) NOT NULL,
    "idTemporada" INTEGER NOT NULL,

    CONSTRAINT "Episodio_pkey" PRIMARY KEY ("idEpisodio")
);

-- CreateTable
CREATE TABLE "Pessoa" (
    "idPessoa" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "papel" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("idPessoa")
);

-- CreateTable
CREATE TABLE "Lista" (
    "idLista" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idUtilizador" INTEGER NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lista_pkey" PRIMARY KEY ("idLista")
);

-- CreateTable
CREATE TABLE "ListaFilme" (
    "idLista" INTEGER NOT NULL,
    "idFilme" INTEGER NOT NULL,

    CONSTRAINT "ListaFilme_pkey" PRIMARY KEY ("idLista","idFilme")
);

-- CreateTable
CREATE TABLE "ListaSerie" (
    "idLista" INTEGER NOT NULL,
    "idSerie" INTEGER NOT NULL,

    CONSTRAINT "ListaSerie_pkey" PRIMARY KEY ("idLista","idSerie")
);

-- CreateTable
CREATE TABLE "Classificacao" (
    "idClassificacao" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "comentario" TEXT,
    "dataAvaliacao" TIMESTAMP(3) NOT NULL,
    "idFilme" INTEGER,
    "idSerie" INTEGER,
    "idUtilizador" INTEGER NOT NULL,

    CONSTRAINT "Classificacao_pkey" PRIMARY KEY ("idClassificacao")
);

-- CreateTable
CREATE TABLE "PessoaFilme" (
    "idPessoa" INTEGER NOT NULL,
    "idFilme" INTEGER NOT NULL,

    CONSTRAINT "PessoaFilme_pkey" PRIMARY KEY ("idPessoa","idFilme")
);

-- CreateTable
CREATE TABLE "PessoaSerie" (
    "idPessoa" INTEGER NOT NULL,
    "idSerie" INTEGER NOT NULL,

    CONSTRAINT "PessoaSerie_pkey" PRIMARY KEY ("idPessoa","idSerie")
);

-- CreateIndex
CREATE UNIQUE INDEX "Filme_titulo_key" ON "Filme"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "Utilizador_nome_key" ON "Utilizador"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Utilizador_email_key" ON "Utilizador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Series_titulo_key" ON "Series"("titulo");

-- AddForeignKey
ALTER TABLE "Filme" ADD CONSTRAINT "Filme_idGenero_fkey" FOREIGN KEY ("idGenero") REFERENCES "Genero"("idGenero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_idGenero_fkey" FOREIGN KEY ("idGenero") REFERENCES "Genero"("idGenero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Temporada" ADD CONSTRAINT "Temporada_idSerie_fkey" FOREIGN KEY ("idSerie") REFERENCES "Series"("idSerie") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episodio" ADD CONSTRAINT "Episodio_idTemporada_fkey" FOREIGN KEY ("idTemporada") REFERENCES "Temporada"("idTemporada") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lista" ADD CONSTRAINT "Lista_idUtilizador_fkey" FOREIGN KEY ("idUtilizador") REFERENCES "Utilizador"("idUtilizador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaFilme" ADD CONSTRAINT "ListaFilme_idLista_fkey" FOREIGN KEY ("idLista") REFERENCES "Lista"("idLista") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaFilme" ADD CONSTRAINT "ListaFilme_idFilme_fkey" FOREIGN KEY ("idFilme") REFERENCES "Filme"("idFilme") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaSerie" ADD CONSTRAINT "ListaSerie_idLista_fkey" FOREIGN KEY ("idLista") REFERENCES "Lista"("idLista") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaSerie" ADD CONSTRAINT "ListaSerie_idSerie_fkey" FOREIGN KEY ("idSerie") REFERENCES "Series"("idSerie") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classificacao" ADD CONSTRAINT "Classificacao_idFilme_fkey" FOREIGN KEY ("idFilme") REFERENCES "Filme"("idFilme") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classificacao" ADD CONSTRAINT "Classificacao_idSerie_fkey" FOREIGN KEY ("idSerie") REFERENCES "Series"("idSerie") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classificacao" ADD CONSTRAINT "Classificacao_idUtilizador_fkey" FOREIGN KEY ("idUtilizador") REFERENCES "Utilizador"("idUtilizador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PessoaFilme" ADD CONSTRAINT "PessoaFilme_idPessoa_fkey" FOREIGN KEY ("idPessoa") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PessoaFilme" ADD CONSTRAINT "PessoaFilme_idFilme_fkey" FOREIGN KEY ("idFilme") REFERENCES "Filme"("idFilme") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PessoaSerie" ADD CONSTRAINT "PessoaSerie_idPessoa_fkey" FOREIGN KEY ("idPessoa") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PessoaSerie" ADD CONSTRAINT "PessoaSerie_idSerie_fkey" FOREIGN KEY ("idSerie") REFERENCES "Series"("idSerie") ON DELETE RESTRICT ON UPDATE CASCADE;
