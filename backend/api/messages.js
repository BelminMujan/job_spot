import { Router } from "express"
import { loadRooms } from "../controllers/messaging.js"
import checkAuth from "./middleware/isAuthenticated.js"
const routes = Router()

routes.get("/load_rooms", checkAuth, loadRooms)

export default routes