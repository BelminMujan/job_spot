import { Router } from "express"
import checkAuth from "./middleware/isAuthenticated.js"
const routes = Router()
import logger from "../utils/logger.js"
import UserService from "../services/user.js"

const userService = new UserService()


routes.post("/register", async (req, res) => {
    try {
        const { email, password, password_confirm } = req.body
        const { data } = await userService.register(email, password, password_confirm)
    } catch (error) {
    }
})


routes.post("/login", async (req, res, next) => {
    try {
        let { err, user, info } = await userService.login(req)
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json(err)
            }
            let userData = user.get()
            delete userData.password
        })
    } catch (error) {
    }


})
routes.get("/logout", checkAuth, async (req, res) => {
    try {
        req.logOut((err) => {

        })
    } catch (error) {

    }
})
routes.get("/load_user", checkAuth, async (req, res) => {
    try {
        req.user.then(data => {
            let userData = data.get()
            delete userData.password
        })
    } catch (error) {

    }
})
routes.post("/update_user", checkAuth, async (req, res) => {
    try {
        const { id, email, username, password, image } = req.body

        const updatedUser = userService.updateUser({ id: req.user.id, email, username, password, image })
    } catch (error) {

    }
})
routes.post("/upload_photo", checkAuth, async (req, res) => {

    try {
        let file = req.files.image;
        console.log(file)
        if (!file) {
            return res.sendStatus(400);
        }
        file.mv("./storage/" + file.name, err => {
            if (err) {
                logger.error("Error uploading image: ", err)
                return res.status(500).send(err);
            }
            logger.info("Image uploaded succesfully")
            return res.status(200).json({ toast: "Image uploaded succesfully" });
        });
    } catch (error) {
        logger.error("MethodError: uploadPhoto - " + error)
        return res.status(500).json({ error: error })
    }
})
routes.get("/search", checkAuth, async (req, res) => {

    try {
        const { email } = req.query

        let users = await userService.searchByEmail(email)

    } catch (error) {

    }

})
export default routes