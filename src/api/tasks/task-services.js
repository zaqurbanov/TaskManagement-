export default class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository
    }

    async create(data) {
        return await this.taskRepository.create(data)
    }

    async findById(id) {
        return await this.taskRepository.findById(id)
    }

    async find(query = {}) {
        return await this.taskRepository.find(query)
    }

    async update(id, data) {
        return await this.taskRepository.update(id, data)
    }

    async delete(id) {
        return await this.taskRepository.delete(id)
    }
}
