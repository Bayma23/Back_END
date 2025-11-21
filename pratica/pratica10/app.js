require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// import routers
const apidocsRouter = require('./routes/apidocsRouter');
const usuariosRouter = require('./routes/usuariosRouter');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Rotas
app.use('/api-docs', apidocsRouter);
app.use('/usuarios', usuariosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// mongoose connection
const user = encodeURIComponent(process.env.MONGODB_USER || '');
const pass = encodeURIComponent(process.env.MONGODB_PASSWORD || '');
const host = process.env.MONGODB_HOST || '';
const db = process.env.MONGODB_DATABASE || 'pratica10';
const uri = `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB conectado');
}).catch((err) => {
  console.error('Erro ao conectar no MongoDB:', err.message);
});

module.exports = app;
