const Tarefa = require('./modelo');
const readline = require('readline-sync');

async function menu() {
  console.log("===== MENU PRINCIPAL =====");
  console.log("1 - Adicionar tarefa");
  console.log("2 - Buscar tarefa");
  console.log("3 - Atualizar tarefa");
  console.log("4 - Remover tarefa");
  console.log("5 - Sair");

  const opcao = readline.question("Escolha uma opção: ");

  switch (opcao) {
    case '1':
      console.log("Função para adicionar tarefa");
      break;
    case '2':
      console.log("Função para buscar tarefa");
      break;
    case '3':
      console.log("Função para atualizar tarefa");
      break;
    case '4':
      console.log("Função para remover tarefa");
      break;
    case '5':
      console.log("Saindo...");
      process.exit();
    default:
      console.log("Opção inválida!");
  }
}

module.exports = { menu };
