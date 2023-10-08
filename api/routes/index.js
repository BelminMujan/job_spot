const { Router } = require("express")
const routes = Router()
const authRouter = require("./authRouter")
const chatRouter = require("./chatRouter")

routes.use("/auth", authRouter)
routes.use("/messages", chatRouter)

module.exports = routes 