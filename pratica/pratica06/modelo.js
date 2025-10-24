
const mongoose = require("mongoose");

const tarefaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descricao: String,
  concluida: {
    type: Boolean,
    default: false
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

const Tarefa = mongoose.model("Tarefa", tarefaSchema);

module.exports = Tarefa;
