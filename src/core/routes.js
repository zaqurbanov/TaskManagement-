import { Router } from "express"
import { userController } from "../api/users/user-di.js"
import { taskController } from "../api/tasks/task-di.js"

const router = Router()

router.post("/users", (req, res) => userController.create(req, res))
router.get("/users", (req, res) => userController.find(req, res))
router.get("/users/:id", (req, res) => userController.findById(req, res))
router.put("/users/:id", (req, res) => userController.update(req, res))
router.delete("/users/:id", (req, res) => userController.delete(req, res))

router.post("/tasks", (req, res) => taskController.create(req, res))
router.get("/tasks", (req, res) => taskController.find(req, res))
router.get("/tasks/:id", (req, res) => taskController.findById(req, res))
router.put("/tasks/:id", (req, res) => taskController.update(req, res))
router.delete("/tasks/:id", (req, res) => taskController.delete(req, res))

export default router
