import logger from "../../Logger/logger.js"
import responseHandler from "../../response/response.js"



export default class UserController {
    constructor(userService){
        this.userService = userService
    }

    async create(req,res){
        const data = req.body
        try {
            const response  = await this.userService.create(data)
            responseHandler(res,{
                statusCode:201,
                data:response,
                message:"Succeded created user"
            })
            logger.infoLog(`Yeni user Yaradildi ${response}`)
            
        } catch (error) {
            logger.errorLog(`user created error : ${error.message}`)
        }
    }
}