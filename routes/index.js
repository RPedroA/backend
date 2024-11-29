const router = require('express').Router();

const authRoutes = require('./authRoutes'); // Import auth routes
router.use('/auth', authRoutes); // Attach auth routes to '/auth'

const filmeRouter = require('./filme');
router.use('/filme', filmeRouter);

const classificacaoRouter = require('./classificacao');
router.use('/classificacao', classificacaoRouter);

const episodioRouter = require('./episodio');
router.use('/episodio', episodioRouter);

const generoRouter = require('./genero');
router.use('/genero', generoRouter);

const listaRouter = require('./lista');
router.use('/lista', listaRouter);

const listafilmeRouter = require('./listafilme');
router.use('/listafilme', listafilmeRouter);

const listaserieRouter = require('./listaserie');
router.use('/listaserie', listaserieRouter);

const pessoaRouter = require('./pessoa');
router.use('/pessoa', pessoaRouter);

const pessoafilmeRouter = require('./pessoafilme');
router.use('/pessoafilme', pessoafilmeRouter);

const pessoaserieRouter = require('./pessoaserie'); 
router.use('/pessoaserie', pessoaserieRouter); 

const serieRouter = require('./series');
router.use('/serie', serieRouter);

const temporadaRouter = require('./temporada');
router.use('/temporada', temporadaRouter);

const utilizadorRouter = require('./utilizador');
router.use('/utilizador', utilizadorRouter); 

const calendarioRouter = require('./calendario');
router.use('/calendario', calendarioRouter);

module.exports = router;
