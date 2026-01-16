const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'sua_senha_secreta_super_dificil';
const AuthController = {

    register: async (req, res) => {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, hashedPassword]);
            res.status(201).json({ message: "Usuário criado!" });
        } catch (error) {
            res.status(400).json({ error: "Erro ao criar usuário (Email já existe?)" });
        }
    },


    login: async (req, res) => {
        const { email, password } = req.body;

        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];


        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Email ou senha inválidos" });
        }


        const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, { expiresIn: '1d' });

        res.json({ token, user: { id: user.id, name: user.name } });
    }
};

module.exports = { AuthController, SECRET_KEY };