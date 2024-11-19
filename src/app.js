import express from "express"
import env from "./core/env.js"
import run from "./core/db.js"
const app = express()
app.use(express.json())

app.use('/',(req,res)=>{
    res.send("test ")
})




app.listen(env.PORT,()=>{
        run() 
     console.log(`App listening port on ${env.PORT}`);
      
    })   

 