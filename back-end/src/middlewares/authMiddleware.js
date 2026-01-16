const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../controllers/AuthController');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ error: "Token necessário" });

    try {

        const cleanToken = token.replace('Bearer ', '');
        const decoded = jwt.verify(cleanToken, SECRET_KEY);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido" });
    }
};

module.exports = verifyToken;