const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função de Sign Up (criação de usuário)
exports.signup = async (req, res) => {
    const { nome, email, password } = req.body;
    try {
        // Verificar se o usuário já existe
        const userExist = await prisma.utilizador.findUnique({
            where: { email }
        });
        if (userExist) {
            return res.status(400).json({ msg: 'Usuário já existe!' });
        }

        // Criar o novo usuário
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.utilizador.create({
            data: {
                nome,
                email,
                password: hashedPassword
            }
        });

        // Gerar o token JWT
        const token = jwt.sign({ id: newUser.idUtilizador, email: newUser.email }, 'yourSecretKey', { expiresIn: '1h' });

        res.status(201).json({ msg: 'Usuário criado com sucesso!', token });
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao criar o usuário', erro: error.message });
    }
};

// Função de Login (autenticação de usuário)
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Verificar se o usuário existe
        const user = await prisma.utilizador.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(400).json({ msg: 'Usuário não encontrado!' });
        }

        // Verificar a senha
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: 'Senha incorreta!' });
        }

        // Gerar o token JWT
        const token = jwt.sign({ id: user.idUtilizador, email: user.email }, 'yourSecretKey', { expiresIn: '1h' });

        res.status(200).json({ msg: 'Login bem-sucedido!', token });
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao fazer login', erro: error.message });
    }
};
