// controller/TaskController.js

import TaskModel from '../model/TaskModel.js';
import TaskView from '../view/TaskView.js';

class TaskController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindAddTask(this.handleAddOrUpdateTask.bind(this));
        this.view.bindDeleteTask(this.handleDeleteTask.bind(this));
        this.view.bindToggleTask(this.handleToggleTask.bind(this));
        this.view.bindFilterTasks(this.handleFilterTasks.bind(this));
        this.model.addObserver(this.view); // Adiciona a view como observador do modelo
    }

    handleAddOrUpdateTask(taskText) {
        if (this.currentEditingTask) {
            // Atualiza a tarefa existente
            this.model.updateTask(this.currentEditingTask.id, taskText);
            this.currentEditingTask = null; // Limpa a referência após atualizar
        } else {
            // Cria uma nova tarefa
            this.model.createTask(taskText);
        }
    }

    handleDeleteTask(id) {
        this.model.deleteTask(id);
    }

    handleToggleTask(id) {
        this.model.toggleTaskCompletion(id); // Alterna a conclusão da tarefa
    }

    handleFilterTasks(filter) {
        const tasks = this.model.tasks; // Obtém todas as tarefas
        let filteredTasks;

        switch (filter) {
            case 'completed':
                filteredTasks = tasks.filter(task => task.completed);
                break;
            case 'pending':
                filteredTasks = tasks.filter(task => !task.completed);
                break;
            case 'all':
            default:
                filteredTasks = tasks; // Retorna todas as tarefas
                break;
        }

        this.view.update(filteredTasks); // Atualiza a visualização com as tarefas filtradas
    }
}

export default TaskController;
