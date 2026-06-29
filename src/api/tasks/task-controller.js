import logger from "../../Logger/logger.js"
import responseHandler from "../../response/response.js"

export default class TaskController {
    constructor(taskService) {
        this.taskService = taskService
    }

    async create(req, res) {
        const data = req.body
        try {
            const response = await this.taskService.create(data)
            responseHandler.success(res, { statusCode: 201, data: response, message: "Task created" })
            logger.infoLog(`Task yaradildi: ${response._id}`)
        } catch (error) {
            logger.errorLog(`Task create error: ${error.message}`)
            responseHandler.success(res, { statusCode: 500, message: error.message, data: [] })
        }
    }

    async find(req, res) {
        try {
            const response = await this.taskService.find(req.query)
            responseHandler.success(res, { statusCode: 200, data: response, message: "Tasks fetched" })
        } catch (error) {
            logger.errorLog(`Task find error: ${error.message}`)
            responseHandler.success(res, { statusCode: 500, message: error.message, data: [] })
        }
    }

    async findById(req, res) {
        const { id } = req.params
        try {
            const response = await this.taskService.findById(id)
            responseHandler.success(res, { statusCode: 200, data: response, message: "Task fetched" })
        } catch (error) {
            logger.errorLog(`Task findById error: ${error.message}`)
            responseHandler.success(res, { statusCode: 500, message: error.message, data: [] })
        }
    }

    async update(req, res) {
        const { id } = req.params
        const data = req.body
        try {
            const response = await this.taskService.update(id, data)
            responseHandler.success(res, { statusCode: 200, data: response, message: "Task updated" })
        } catch (error) {
            logger.errorLog(`Task update error: ${error.message}`)
            responseHandler.success(res, { statusCode: 500, message: error.message, data: [] })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        try {
            const response = await this.taskService.delete(id)
            responseHandler.success(res, { statusCode: 200, data: response, message: "Task deleted" })
        } catch (error) {
            logger.errorLog(`Task delete error: ${error.message}`)
            responseHandler.success(res, { statusCode: 500, message: error.message, data: [] })
        }
    }
}
