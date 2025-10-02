const express = require('express');
const morgan = require('morgan');

const tarefaRouter = require('./routes/tarefaRouter');

const app = express();

// Middleware
app.use(morgan('dev'));         // Logs no console
app.use(express.json());        // Permite receber JSON no body

// Rotas
app.use('/tarefas', tarefaRouter);

// Tratamento de erros básicos (opcional, mas recomendado)
app.use((req, res, next) => {
  res.status(404).json({ msg: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Erro interno do servidor' });
});

module.exports = app;
