import path, { dirname } from "node:path"
import fs from "node:fs"


 class Logger{
    constructor(){
        if(Logger.instance){
            return Logger.instance
        }else{
            Logger.instance = this
            return Logger.instance
        }

    }

    formatDate(){
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth()+1
        const year = date.getFullYear();
        const hour = date.getHours()
        const seconds = date.getSeconds()

        return `${day}/${month}/${year} -- ${hour}:${seconds}`
    } 
    infoLog(message){
        const logData = `\u001b[33m[LOG]: type: Warning | message: ${message} | time: ${this.formatDate()}\u001b[0m\n`;
        try {
            fs.appendFile('./infoLog.txt',logData,()=>{
                  
            }) 
            
        } catch (error) {
            console.log(error); 
        }
    }
    errorLog(message){
        const logData = `[LOG]: Type:[ERROR] | message: ${message} Time: ${this.formatDate()}`
        try {
            fs.appendFile('./errorLog.txt',logData,()=>{})
        } catch (error) {
            
        }
    }
}    
const logger = new Logger()
export default logger