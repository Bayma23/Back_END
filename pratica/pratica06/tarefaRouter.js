
const express = require("express");
const router = express.Router();
const controlador = require("./controlador/tarefaController");

router.get("/", controlador.listarTarefas);
router.post("/", controlador.criarTarefa);
router.put("/:id", controlador.atualizarTarefa);
router.delete("/:id", controlador.deletarTarefa);

module.exports = router;
