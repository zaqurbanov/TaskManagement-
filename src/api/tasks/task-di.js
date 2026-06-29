import TaskRepository from "./task-repository.js"
import TaskService from "./task-services.js"
import TaskController from "./task-controller.js"

const taskRepository = new TaskRepository()
const taskService = new TaskService(taskRepository)
export const taskController = new TaskController(taskService)
