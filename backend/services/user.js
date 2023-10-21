import Joi from "joi"
import joii from "../utils/joii.js"
import UserRepository from "../database/repository/user.js"
import User from "../database/models/user.js"
import { AppError } from "../utils/Error.js"
import Logger from "../utils/log.js"

export default class UserService {

    userRepository = new UserRepository()

    async register(email, password, password_confirm) {

        const schema = joii.object({
            email: Joi.string().email({ minDomainSegments: 2 }),
            password: Joi.string(),
            // password: Joi.string().alphanum().pattern(new RegExp('^[a-zA-Z0-9]{8, 30}$')),
            password_confirm: Joi.ref("password")
        }).options({ abortEarly: false })

        const validateResult = schema.validate({ email, password, password_confirm })

        if (validateResult?.error) {
            throw new AppError("Validation error", 500, "Error validating on register", true, validateResult?.error)
        }

        let user = await userRepository.createUser({ email, password })
        res.status(200).json({ user: user })
    }

    async login() {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                throw new AppError("App error", 500, "Error on passport authenticate", true, err?.stack)
            } else {
                if (user) {
                    Logger.loginfo("Attempt logging in: " + user.email)
                } else {
                    throw new AppError("Api error", 401, "Unathorized", true, info)
                }
            }
        });
    }
    async updateUser(data) {

        const { id, email, username, password, image } = data
        let user = await userRepository.loadUser(id)
        user.email = email || user.email
        user.username = username || user.username
        user.password = password || user.password
        user.image = image || user.image
        user.save()
        return user
    }
    async searchByEmail(email) {
        if (!email || email === "") {
            return []
        }
        let users = await User.findAll({
            where: {
                email: {
                    [Op.like]: `%${email}%`
                }
            },
            attributes: ["id", "email"]
        })
        return users
    }
}

