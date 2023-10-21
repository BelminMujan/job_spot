import { Router } from "express"
import checkAuth from "./middleware/isAuthenticated.js"
const routes = Router()
import UserService from "../services/user.js"
import { AppError, InternalServerError, STATUS_CODES } from "../utils/Error.js"
import Logger from "../utils/log.js"

const userService = new UserService()


routes.post("/register", async (req, res, next) => {
    try {
        Logger.loginfo("Test from static methdo")
        const { email, password, password_confirm } = req.body
        const { data } = await userService.register(email, password, password_confirm)
    } catch (error) {
        next(new InternalServerError(
            "API Error",
            "Error on register",
            error.stack,
        ))
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
        next(new InternalServerError(
            "API Error",
            "Error on login",
            error.stack,
        ))
    }


})
routes.get("/logout", checkAuth, async (req, res, next) => {
    try {
        req.logOut((err) => {

        })
    } catch (error) {
        next(new InternalServerError(
            "API Error",
            "Error on logout",
            error.stack,
        ))
    }
})
routes.get("/load_user", checkAuth, async (req, res, next) => {
    try {
        req.user.then(data => {
            let userData = data.get()
            delete userData.password
        })
    } catch (error) {
        next(new InternalServerError(
            "API Error",
            "Error on load_user",
            error.stack,
        ))
    }
})
routes.post("/update_user", checkAuth, async (req, res, next) => {
    try {
        const { id, email, username, password, image } = req.body

        const updatedUser = userService.updateUser({ id: req.user.id, email, username, password, image })
    } catch (error) {
        next(new InternalServerError(
            "API Error",
            "Error on update_user",
            error.stack,
        ))
    }
})
routes.post("/upload_photo", checkAuth, async (req, res, next) => {

    try {
        let file = req.files.image;
        console.log(file)
        if (!file) {
            return res.sendStatus(400);
        }
        file.mv("./storage/" + file.name, err => {
            if (err) {
                throw new AppError("App error", 500, "Error Saving photo", true, err.stack)
            }
            Logger.loginfo("Image uploaded succesfully")
            return res.status(200).json({ toast: "Image uploaded succesfully" });
        });
    } catch (error) {
        next(new InternalServerError(
            "API Error",
            "Error uploading photo",
            error.stack,
        ))
    }
})
routes.get("/search", checkAuth, async (req, res, next) => {

    try {
        const { email } = req.query

        let users = await userService.searchByEmail(email)

    } catch (error) {
        next(new InternalServerError(
            "API Error",
            "Error searching users",
            error.stack,
        ))
    }

})
export default routes