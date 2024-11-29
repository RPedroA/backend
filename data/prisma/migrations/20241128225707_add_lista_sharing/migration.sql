-- AlterTable
ALTER TABLE "Filme" ADD COLUMN     "classificacaoMedia" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "classificacaoMedia" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "ListaCompartilhamento" (
    "idCompartilhamento" SERIAL NOT NULL,
    "idLista" INTEGER NOT NULL,
    "idUtilizador" INTEGER NOT NULL,

    CONSTRAINT "ListaCompartilhamento_pkey" PRIMARY KEY ("idCompartilhamento")
);

-- CreateTable
CREATE TABLE "Calendario" (
    "idCalendario" SERIAL NOT NULL,
    "dataEvento" TIMESTAMP(3) NOT NULL,
    "lembrete" TEXT,
    "idUtilizador" INTEGER NOT NULL,
    "idFilme" INTEGER,
    "idEpisodio" INTEGER,

    CONSTRAINT "Calendario_pkey" PRIMARY KEY ("idCalendario")
);

-- AddForeignKey
ALTER TABLE "ListaCompartilhamento" ADD CONSTRAINT "ListaCompartilhamento_idLista_fkey" FOREIGN KEY ("idLista") REFERENCES "Lista"("idLista") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaCompartilhamento" ADD CONSTRAINT "ListaCompartilhamento_idUtilizador_fkey" FOREIGN KEY ("idUtilizador") REFERENCES "Utilizador"("idUtilizador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calendario" ADD CONSTRAINT "Calendario_idUtilizador_fkey" FOREIGN KEY ("idUtilizador") REFERENCES "Utilizador"("idUtilizador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calendario" ADD CONSTRAINT "Calendario_idFilme_fkey" FOREIGN KEY ("idFilme") REFERENCES "Filme"("idFilme") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calendario" ADD CONSTRAINT "Calendario_idEpisodio_fkey" FOREIGN KEY ("idEpisodio") REFERENCES "Episodio"("idEpisodio") ON DELETE SET NULL ON UPDATE CASCADE;
