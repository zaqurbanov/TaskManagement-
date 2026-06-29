import express from "express"
import env from "./core/env.js"
import run from "./core/db.js"
import router from "./core/routes.js"

const app = express()
app.use(express.json())
app.use("/api", router)

app.listen(env.PORT, () => {
    run()
    console.log(`App listening port on ${env.PORT}`)
})
