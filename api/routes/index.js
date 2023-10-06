const { Router } = require("express")
const routes = Router()
const authRouter = require("./authRouter")

routes.use("/auth", authRouter)

module.exports = routes 