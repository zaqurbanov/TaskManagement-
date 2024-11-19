

export default class BaseRepository{
    constructor(model){
        
        this.model = model
    }

    async create(data){
        return await this.model.create(data)
    }

    async findById(id){
        return await this.model.findById(id)
    }

    async delete(id){
        return await this.model.findByIdAndDelete(id)
    }
    async find(query={}){
        return await this.model.find(query)
    }
    async update(id,data){
        return await this.model.findByIdAndUpdate(id,data,{new:true})
    }
}