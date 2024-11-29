const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Pega o token do cabeçalho

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado. Sem token.' });
    }

    try {
        const decoded = jwt.verify(token, 'yourSecretKey'); // Verifica o token com a chave secreta
        req.user = decoded; // Adiciona os dados do usuário à requisição
        next();  // Passa para a próxima etapa (controlador de rota)
    } catch (error) {
        res.status(400).json({ msg: 'Token inválido' });
    }
};

module.exports = authenticate;
