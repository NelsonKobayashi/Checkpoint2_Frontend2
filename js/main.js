const btnAdd = document.getElementById('btn-add');
let tarefaInput = document.getElementById('tarefa');
let dataCriacaoInput = document.getElementById('dataCriacao');
let dataFinalInput = document.getElementById('dataFinal');
let tempoInput;
const erro = document.querySelector('#erro')
const counterTitle = document.getElementById("counterTitle");
const maxTitleLenght = tarefaInput.getAttribute('maxlength');


/* adicionando contador/limite para o campo de título */
tarefaInput.addEventListener("input", function (e) {
    const inputTitleLenght = tarefaInput.value.length;
    
    counterTitle.innerText = `${maxTitleLenght - inputTitleLenght}`;
    if (inputTitleLenght >= maxTitleLenght-10) {
        counterTitle.style.color = '#f00';
    } else {
        counterTitle.style.color = '';
    };
});

/* acessando o localStorage */
let dados = (localStorage.getItem('todoList')) ?
    JSON.parse(localStorage.getItem('todoList')) : {
        todo: [],
        completed: []
    };

/* carregando data e horário local */
window.onload = () => {
    tempoInput = setInterval(() => {
        let now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
        dataCriacaoInput.value = now.toISOString().slice(0, -8);
    }, 200);
}, carregarToDoNoDOM();

/* verificando os campos e chamando o addTarefa */
btnAdd.addEventListener('click', () => {
    if (tarefaInput.value == '') {
        alert("O campo da Tarefa deve ser preenchido.")
        return;
    }
    if(dataFinalInput.value < dataCriacaoInput.value){
        alert("A data final deve ser maior que a data inicial.");
        return;
    }        
    if (tarefaInput.value !== '' && dataCriacaoInput.value !== '' && dataFinalInput.value !== '') {
        addTarefa(tarefaInput.value, dataCriacaoInput.value.replace(/-/g, '/').replace('T', ' '), dataFinalInput.value.replace('T', ' ').replace(/-/g, '/'))
        counterTitle.innerHTML = maxTitleLenght;
    }

})

/* inseri no LocalStorage */
function addTarefa(tarefaValue, dataCriacaoValue, dataFinalValue) {
    addTarefaNoDOM(tarefaValue, dataCriacaoValue, dataFinalValue);
    dados.todo.push({
        tarefa: tarefaValue,
        dataCriacao: dataCriacaoValue,
        dataFinal: dataFinalValue
    })
    localStorage.setItem('todoList', JSON.stringify(dados));
    tarefaInput.value = '';
    tarefaInput.focus();
}

/* função para exclusão do card e do localStorage */
function removerTarefa() {
    if (confirm("Quer mesmo apagar? (Clique em 'OK' ou pressione 'ENTER')")) {
        let item = this.parentNode.parentNode;
        let parent = item.parentNode;
        let id = parent.id;

        let tarefaTxt = item.firstChild.textContent;
        let dataCriacaoTxt = item.children[1].children[0].textContent;
        let dataFinalTxt = item.children[1].children[1].textContent;

        let value = {
            tarefa: tarefaTxt,
            dataCriacao: dataCriacaoTxt,
            dataFinal: dataFinalTxt
        }

        let todo = dados.todo;
        let completed = dados.completed;

        if (id === 'todo') {
            dados.todo.splice(todo.findIndex((a) => {
                return a.tarefa === value.tarefa;
            }), 1);
        } else {
            dados.completed.splice(completed.findIndex((a) => {
                return a.tarefa === value.tarefa;
            }), 1);
        }

        localStorage.setItem('todoList', JSON.stringify(dados));

        parent.removeChild(item);
    }
}

/* função para alterar o status da tarefa */
function completarTarefa() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let id = parent.id;

    let tarefaTxt = item.firstChild.textContent;
    let dataCriacaoTxt = item.children[1].children[0].textContent;
    let dataFinalTxt = item.children[1].children[1].textContent;

    let value = {
        tarefa: tarefaTxt,
        dataCriacao: dataCriacaoTxt,
        dataFinal: dataFinalTxt
    }

    if (id === 'todo') {
        dados.todo.splice(dados.todo.findIndex((a) => {
            return a.tarefa === value.tarefa;
        }), 1);
        dados.completed.push(value);
    } else {
        dados.completed.splice(dados.completed.findIndex((a) => {
            return a.tarefa === value.tarefa;
        }), 1);
        dados.todo.push(value);
    }

    localStorage.setItem('todoList', JSON.stringify(dados));

    let itemAlvo = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

    parent.removeChild(item);
    itemAlvo.insertBefore(item, itemAlvo.childNodes[0]);
}

/* inseri o card no DOM */
function addTarefaNoDOM(tarefaValue, dataCriacaoValue, dataFinalValue, isCompleted) {
    let list = (isCompleted) ? document.getElementById('completed') : document.getElementById('todo');

    let item = document.createElement('div');
    item.classList.add('to-do-div');
    item.innerHTML =
        `<h5>${tarefaValue}</h5>
        <div>
        <span>Add: ${dataCriacaoValue}</span>
        <span>End: ${dataFinalValue}</span>
        </div>
        `;

    /* criando os botões */    
    let buttons = document.createElement('div');
    buttons.classList.add('buttons');
    /* criando o botão remover */
    let remover = document.createElement('button');
    remover.classList.add('remover');
    remover.innerHTML =
        `<span class="fa-stack fa-1x">
        <i class="fas fa-circle fa-stack-2x"></i>
        <i class="fa fa-trash fa-stack-1x fa-inverse" aria-hidden="true"></i>
        </span>`;

    remover.addEventListener('click', removerTarefa)
    /* criando o botão de completar a tarefa  */
    let completar = document.createElement('button');
    completar.classList.add('completar');
    completar.innerHTML =
        `<span class="fa-stack fa-1x">
        <i class="fas fa-circle fa-stack-2x"></i>
        <i class="fas fa-check fa-stack-1x fa-inverse"></i>
        </span>`;

    completar.addEventListener('click', completarTarefa)
    /* apendando os botões */
    buttons.appendChild(remover);
    buttons.appendChild(completar);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}



/* lendo localStorage para verificar se há cards salvos */
function carregarToDoNoDOM() {
    if (!dados.todo.length && !dados.completed.length) return;

    for (let i = 0; i < dados.todo.length; i++) {
        let valueToDo = dados.todo[i];
        addTarefaNoDOM(valueToDo.tarefa, valueToDo.dataCriacao, valueToDo.dataFinal);
    }

    for (let j = 0; j < dados.completed.length; j++) {
        let valueCompleted = dados.completed[j];
        addTarefaNoDOM(valueCompleted.tarefa, valueCompleted.dataCriacao, valueCompleted.dataFinal, true);
    }
}
