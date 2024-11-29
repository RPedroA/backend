const express = require('express');
const { signup, login } = require('../controllers/authcontroller');
const authenticate = require('../middleware/authenticate');  // Middleware de autenticação

const router = express.Router();

// Rota de Sign Up (criação de usuário)
router.post('/signup', signup);

// Rota de Login (autenticação de usuário)
router.post('/login', login);

// Rota protegida (necessita de autenticação)
router.get('/protected', authenticate, (req, res) => {
    res.status(200).json({ msg: 'Bem-vindo à rota protegida', user: req.user });
});

module.exports = router;
