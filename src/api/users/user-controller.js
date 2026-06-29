import logger from "../../Logger/logger.js"
import responseHandler from "../../response/response.js"

export default class UserController {
    constructor(userService) {
        this.userService = userService
    }

    async create(req, res) {
        const data = req.body
        try {
            const response = await this.userService.create(data)
            responseHandler.success(res, { statusCode: 201, data: response, message: "User created" })
            logger.infoLog(`Yeni user yaradildi: ${response._id}`)
        } catch (error) {
            logger.errorLog(`User create error: ${error.message}`)
            responseHandler.success(res, { statusCode: 500, message: error.message, data: [] })
        }
    }

    async find(req, res) {
        try {
            const response = await this.userService.find(req.query)
            responseHandler.success(res, { statusCode: 200, data: response, message: "Users fetched" })
        } catch (error) {
            logger.errorLog(`User find error: ${error.message}`)
            responseHandler.success(res, { statusCode: 500, message: error.message, data: [] })
        }
    }

    async findById(req, res) {
        const { id } = req.params
        try {
            const response = await this.userService.findById(id)
            responseHandler.success(res, { statusCode: 200, data: response, message: "User fetched" })
        } catch (error) {
            logger.errorLog(`User findById error: ${error.message}`)
            responseHandler.success(res, { statusCode: 500, message: error.message, data: [] })
        }
    }

    async update(req, res) {
        const { id } = req.params
        const data = req.body
        try {
            const response = await this.userService.update(id, data)
            responseHandler.success(res, { statusCode: 200, data: response, message: "User updated" })
        } catch (error) {
            logger.errorLog(`User update error: ${error.message}`)
            responseHandler.success(res, { statusCode: 500, message: error.message, data: [] })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        try {
            const response = await this.userService.delete(id)
            responseHandler.success(res, { statusCode: 200, data: response, message: "User deleted" })
        } catch (error) {
            logger.errorLog(`User delete error: ${error.message}`)
            responseHandler.success(res, { statusCode: 500, message: error.message, data: [] })
        }
    }
}
