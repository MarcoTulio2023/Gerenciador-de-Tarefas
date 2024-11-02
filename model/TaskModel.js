// model/TaskModel.js

class TaskModel {
    constructor() {
        this.tasks = this.loadTasks(); // Carrega as tarefas do Local Storage
        this.observers = []; // Lista de observadores
    }

    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : []; // Retorna as tarefas em formato de objeto
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Salva as tarefas no Local Storage
    }

    createTask(taskText) {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };
        this.tasks.push(newTask);
        this.saveTasks(); // Salva as tarefas sempre que uma nova é criada
        this.notifyObservers();
    }

    toggleTaskCompletion(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed; // Alterna o estado de conclusão
            this.saveTasks(); // Salva as alterações
            this.notifyObservers();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks(); // Salva as alterações
        this.notifyObservers(); // Notificar os observadores sobre a exclusão
    }

    updateTask(id, newText) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.text = newText;
            this.saveTasks(); // Salva as alterações
            this.notifyObservers(); // Notificar os observadores sobre a atualização
        }
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update(this.tasks));
    }
}

export default TaskModel;
