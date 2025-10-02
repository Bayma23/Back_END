const tarefaModel = require("../models/tarefaModel");


function listar(req, res) {
  const resultado = tarefaModel.listar();
  res.json(resultado);
}

function buscarPeloId(req, res) {
  const { tarefaId } = req.params;
  const resultado = tarefaModel.buscarPeloId(tarefaId);

  if (!resultado) {
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  }

  res.json(resultado);
}


function criar(req, res) {
  const resultado = tarefaModel.criar(req.body);
  res.status(201).json(resultado);
}

function atualizar(req, res) {
  const resultado = tarefaModel.atualizar({ id: req.params.tarefaId, ...req.body });

  if (!resultado) {
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  }

  res.json(resultado);
}

function remover(req, res) {
  const resultado = tarefaModel.remover(req.params.tarefaId);

  if (!resultado) {
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  }

  res.status(204).send();
}

module.exports = { listar, buscarPeloId, criar, atualizar, remover };
