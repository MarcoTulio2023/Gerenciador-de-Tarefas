// view/TaskView.js

class TaskView {
    constructor() {
        this.taskInput = document.getElementById('taskInput');
        this.addTaskButton = document.getElementById('addTaskButton');
        this.taskList = document.getElementById('taskList');
        this.filterButtons = document.getElementById('filterButtons');
        this.currentEditingTask = null; // Para rastrear a tarefa que está sendo editada
    }

    bindAddTask(handler) {
        this.addTaskButton.addEventListener('click', () => {
            const taskText = this.taskInput.value.trim();
            if (taskText) {
                if (this.currentEditingTask) {
                    return; // Se uma tarefa está sendo editada, não faz nada aqui
                } else {
                    handler(taskText);
                    this.taskInput.value = ''; // Limpa o campo de entrada
                }
            }
        });
    }

    bindEditTask(handler) {
        this.taskList.addEventListener('click', event => {
            if (event.target.classList.contains('edit-btn')) {
                const id = parseInt(event.target.parentElement.dataset.id);
                this.currentEditingTask = id; // Armazena o ID da tarefa que está sendo editada
                const taskText = event.target.parentElement.firstChild.textContent.trim();
                this.showEditInput(taskText, handler);
            }
        });
    }

    bindDeleteTask(handler) {
        this.taskList.addEventListener('click', event => {
            if (event.target.classList.contains('delete-btn')) {
                const id = parseInt(event.target.parentElement.dataset.id);
                handler(id); // Chama o manipulador de deletar tarefa com o ID
            }
        });
    }

    bindToggleTask(handler) {
        this.taskList.addEventListener('click', event => {
            if (event.target.classList.contains('toggle-btn')) {
                const id = parseInt(event.target.parentElement.dataset.id);
                handler(id); // Chama o manipulador de marcar/desmarcar tarefa com o ID
            }
        });
    }

    bindFilterTasks(handler) {
        this.filterButtons.addEventListener('click', event => {
            if (event.target.tagName === 'BUTTON') {
                const filter = event.target.dataset.filter;
                handler(filter); // Chama o manipulador de filtro
            }
        });
    }

    showEditInput(taskText, handler) {
        // Limpa a lista de tarefas
        this.taskList.innerHTML = '';

        // Cria novos elementos de entrada e botão
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = taskText;
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Adicionar Alteração';

        // Adiciona os novos elementos à lista
        const li = document.createElement('li');
        li.appendChild(editInput);
        li.appendChild(updateButton);
        this.taskList.appendChild(li);

        // Adiciona o evento de clique ao botão de atualização
        updateButton.addEventListener('click', () => {
            const updatedTaskText = editInput.value.trim();
            if (updatedTaskText) {
                handler(this.currentEditingTask, updatedTaskText);
                this.currentEditingTask = null; // Limpa a referência após atualizar
                this.update(handler); // Chama o método de atualização para reexibir a lista de tarefas
            }
        });
    }

    displayTasks(tasks) {
        this.taskList.innerHTML = tasks.map(task => `
            <li data-id="${task.id}" class="${task.completed ? 'completed' : ''}">
                ${task.text}
                <button class="toggle-btn">${task.completed ? 'Desmarcar' : 'Marcar'}</button>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Deletar</button>
            </li>
        `).join('');
    }

    update(tasks) {
        this.displayTasks(tasks);
    }
}

export default TaskView;
