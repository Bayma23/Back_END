// app.js
const express = require("express");
const conectaBancoDeDados = require("./database/database");
const tarefaRouter = require("./routes/tarefaRouter");

const app = express();
app.use(express.json());

conectaBancoDeDados();

app.use("/tarefas", tarefaRouter);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
