const express = require('express');
const morgan = require('morgan');

const tarefaRouter = require('./routes/tarefaRouter');

const app = express();


app.use(morgan('dev'));        
app.use(express.json());        


app.use('/tarefas', tarefaRouter);


app.use((req, res, next) => {
  res.status(404).json({ msg: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Erro interno do servidor' });
});

module.exports = app;
