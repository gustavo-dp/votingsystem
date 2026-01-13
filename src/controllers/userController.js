const db = require('../config/db')

module.exports = {
    // GET /users
    getAll: async (req, res) => {
        try {


            const [rows] = await db.query('SELECT * FROM users');

            res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar usuários" });
        }
    },

    // POST /users
    create: async (req, res) => {
        const { name, email } = req.body;

        try {
            const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';

            const [result] = await db.query(sql, [name, email]);

            res.status(201).json({
                id: result.insertId,
                name,
                email
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao cadastrar usuário" });
        }
    }
};