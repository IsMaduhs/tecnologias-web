const adicionar = document.querySelector(".button-add-task");
const input = document.querySelector('.input-task');
const listaTarefas = document.querySelector('.list-tasks')
let listaDeItens = [];

function addNovaTarefa () {
    // Verificar se o campo de entrada está vazio
    // trim limpa os espaços vazios, se apos a "limpeza"
    //o valor for nulo, então avisamos o usuário, evitando criar 
    //tarefas vazias
  if (input.value.trim() === '') {
    alert("Por favor, insira uma tarefa antes de adicionar!");
    return; // Retorna para evitar adicionar uma tarefa vazia à lista
  }
    listaDeItens.push({
        tarefa: input.value,
        concluida: false
    });
    //console.log(listaDeItens)
    input.value = '';

    mostrarTarefas()
}

function mostrarTarefas () {

    let novaLi = '';
    listaDeItens.map ((item, index) => {
        novaLi = novaLi + `
        <li class="task" ${item.concluida && "done"}">
        <img src="./img/check.png" alt="confere" onclick="concluirTarefa(${index})">
        <p>${item.tarefa}</p>
        <img src="./img/exclude.png" alt="excluir" onclick="deletarItem(${index})">
        </li>`
    })

    listaTarefas.innerHTML = novaLi;

    localStorage.setItem('lista', JSON.stringify(listaDeItens))
}

function concluirTarefa(index) {
    listaDeItens[index].concluida = !listaDeItens[index].concluida

    mostrarTarefas()
}

function deletarItem(index){
    listaDeItens.splice(index, 1);

    mostrarTarefas()
}

function recarregarTarefas() {
    const tasksLocalStorage = localStorage.getItem('lista')

    if(tasksLocalStorage) {
        listaDeItens = JSON.parse(tasksLocalStorage)
    }  

    mostrarTarefas()
}

recarregarTarefas()
adicionar.addEventListener('click',addNovaTarefa);