const inputTarefa = document.getElementById("inputTarefa")
const botaoTarefa = document.getElementById("botaoTarefa")
const liTarefa = document.querySelector(".lista-task")
const botaoLixeira = document.querySelector(".fa-solid fa-trash")

let listaTarefa = []

function adicionarTarefa(){
    if(inputTarefa.value === ""){
        alert("A tarefa não pode estar vazia !")
        return;
    }
    listaTarefa.push({
        tarefa:inputTarefa.value,
        concluida: false
    })
    inputTarefa.value = "";
    mostrarTarefa();
}


function mostrarTarefa(){
    let novaLi = ''
    listaTarefa.forEach((item,index) => {
        novaLi = novaLi +  `
        <li class="task ${item.concluida && "done"}">
            <input 
            type="checkbox"
            class="checkbox"
            onclick="concluirTarefa(${index})"
            ${item.concluida ? "checked" : ""}
            >
            <p>${item.tarefa}</p>
            <i class="fa-solid fa-trash" onclick="deletarTarefa(${index})"></i>
        </li>
        `
    })

    liTarefa.innerHTML = novaLi;
    localStorage.setItem('lista', JSON.stringify(listaTarefa))
}


function deletarTarefa(index){
    listaTarefa.splice(index,1)
    mostrarTarefa()
}


function concluirTarefa(index){
    listaTarefa[index].concluida = !listaTarefa[index].concluida;
    mostrarTarefa()
}

function recarregarTarefas(){
    const tarefaDoLocalStorage = localStorage.getItem("lista")

    if(tarefaDoLocalStorage){
        listaTarefa = JSON.parse(tarefaDoLocalStorage);
    }
    console.log(tarefaDoLocalStorage)
    mostrarTarefa()
}

recarregarTarefas()
botaoTarefa.addEventListener('click', adicionarTarefa)
