
const readline = require('readline-sync');
const controlador = require('./controlador');

function menu() {
  console.log('\n===== MENU PRINCIPAL =====');
  console.log('1 - Adicionar tarefa');
  console.log('2 - Buscar tarefa');
  console.log('3 - Atualizar tarefa');
  console.log('4 - Remover tarefa');
  console.log('5 - Sair');
}

async function escolherOpcao(opcao) {
  switch (opcao) {
    case '1':
      const nomeAdicionar = readline.question('Digite o nome da tarefa: ');
      await controlador.adicionarTarefa(nomeAdicionar);
      break;

    case '2':
      const nomeBuscar = readline.question('Digite o nome da tarefa: ');
      const tarefaEncontrada = await controlador.buscarTarefa(nomeBuscar);
      if (tarefaEncontrada && tarefaEncontrada.id) {
        console.log('Tarefa encontrada:', tarefaEncontrada);
      } else {
        console.log('Tarefa não encontrada.');
      }
      break;

    case '3':
      const nomeAtualizar = readline.question('Digite o nome da tarefa: ');
      const concluida = readline.question('A tarefa está concluída? (true/false): ') === 'true';
      await controlador.atualizarTarefa(nomeAtualizar, concluida);
      break;

    case '4':
      const nomeRemover = readline.question('Digite o nome da tarefa: ');
      await controlador.removerTarefa(nomeRemover);
      break;

    case '5':
      console.log('Saindo...');
      process.exit();

    default:
      console.log('Opção inválida!');
  }
}

async function main() {
  while (true) {
    menu();
    const opcao = readline.question('Escolha uma opção: ');
    await escolherOpcao(opcao);
  }
}
async function main() {
    await controlador.menu();
  }

main();
