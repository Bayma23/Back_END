
const Tarefa = require("./modelo");


const listarTarefas = async (req, res) => {
  const tarefas = await Tarefa.find();
  res.json(tarefas);
};


const criarTarefa = async (req, res) => {
  const tarefa = new Tarefa(req.body);
  const novaTarefa = await tarefa.save();
  res.status(201).json(novaTarefa);
};


const atualizarTarefa = async (req, res) => {
  const tarefaAtualizada = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tarefaAtualizada);
};


const deletarTarefa = async (req, res) => {
  await Tarefa.findByIdAndDelete(req.params.id);
  res.json({ mensagem: "Tarefa deletada com sucesso!" });
};

module.exports = { listarTarefas, criarTarefa, atualizarTarefa, deletarTarefa };
