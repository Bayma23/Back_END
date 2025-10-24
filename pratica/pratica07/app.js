const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const produtosRouter = require('./routes/produtosRouter');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`
)
.then(() => console.log('MongoDB conectado!'))
.catch((err) => console.error('Erro MongoDB:', err));

app.use('/produtos', produtosRouter);

module.exports = app;
