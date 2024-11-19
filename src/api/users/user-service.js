
export default class UserService{
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async create(data){
        const response  = await this.userRepository.create(data)
        return response
    }

    async findById(id){
        const response = await this.userRepository.findById(id)
        return response
    }
    async delete(id){
        const response = await this.userRepository.delete(id)
        return response
    }

    async find(query={}){
        const response = await this.userRepository.find(query)
        return response
    }
    async update(id,data){
        const response = await this.userRepository.update(id,data)
        return response
    }
}
