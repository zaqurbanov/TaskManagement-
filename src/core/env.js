
import dotenv from "dotenv"
dotenv.config()

// butun env deyerlerini burada toplayiriq. 
export default  {
    PORT:process.env.PORT,
    MONGO_PATH:process.env.MONGO_PATH
}