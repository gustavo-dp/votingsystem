
require('dotenv').config();

const app = require('./app');


const PORT = process.env.PORT || 3000;


const server = app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
    console.log(`Ambiente: ${process.env.DB_NAME || 'Não definido'}`);
});


server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(` Erro: A porta ${PORT} já está sendo usada por outro programa.`);
    } else {
        console.error(' Erro ao iniciar servidor:', err);
    }
});