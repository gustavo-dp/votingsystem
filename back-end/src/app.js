const express = require('express');
const cors = require('cors');
const pollRoutes = require('./routes/pollRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
app.use(cors());



app.use(express.json());


app.use('/polls', pollRoutes);
app.use('/auth', authRoutes)

module.exports = app;