const { Router } = require("express")
const chatController = require("../controllers/messaging")
const checkAuth = require("../middleware/isAuthenticated")
const routes = Router()

routes.get("/load_rooms", checkAuth, chatController.loadRooms)

module.exports = routes 