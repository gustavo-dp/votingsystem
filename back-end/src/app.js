const express = require('express');
const cors = require('cors');
const pollRoutes = require('./routes/pollRoutes');

const app = express();
app.use(cors());



app.use(express.json());


app.use('/polls', pollRoutes);

module.exports = app;