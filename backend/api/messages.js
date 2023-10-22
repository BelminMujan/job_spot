import { Router } from "express"
import checkAuth from "./middleware/isAuthenticated.js"
import { loadRooms } from "../services/messages.js"
const routes = Router()

routes.get("/load_rooms", checkAuth, loadRooms)

export default routes