// app.js

import TaskModel from './model/TaskModel.js';
import TaskView from './view/TaskView.js';
import TaskController from './controller/TaskController.js'; // Certifique-se de que isso é o que você tem

const app = new TaskController(new TaskModel(), new TaskView());
