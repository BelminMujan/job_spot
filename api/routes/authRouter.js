const { Router } = require("express")
const authController = require("../controllers/authController")
const passport = require("passport")
const checkAuth = require("../middleware/isAuthenticated")
const routes = Router()

routes.post("/register", authController.register)
// routes.post("/login", passport.authenticate('local', {}), authController.login)
routes.post("/login", authController.login)
routes.get("/logout", checkAuth, authController.logout)
routes.get("/load_user", checkAuth, authController.loadUser)
module.exports = routes 