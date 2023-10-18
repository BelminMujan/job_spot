import { Router } from "express"
const routes = Router()
import authRouter from "./user.js"
import chatRouter from "./messages.js"

routes.use("/auth", authRouter)
routes.use("/messages", chatRouter)

export default routes