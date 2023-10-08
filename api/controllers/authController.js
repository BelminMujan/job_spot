const Joi = require("joi");
const User = require("../models/user")
const joii = require("../helpers/joii");
const passport = require("passport");
const { Op } = require("sequelize");
const logger = require("../helpers/logger");


const register = async (req, res) => {
    logger.info("Attempt to register with email: " + req.body?.email)
    const schema = joii.object({
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string(),
        // password: Joi.string().alphanum().pattern(new RegExp('^[a-zA-Z0-9]{8, 30}$')),
        password_confirm: Joi.ref("password")
    }).options({ abortEarly: false })
    const validateResult = schema.validate(req.body)
    if (validateResult?.error) {
        logger.error("Invalid data during register")
        return res.status(412).json(validateResult.error.toJson())
    }
    logger.info("User " + req.body?.email + " registered succesfully!")


    let user = await User.create(req.body)
    res.status(200).json({ user: user })
}

const loadUser = async (req, res) => {

    req.user.then(data => {
        let userData = data.get()
        logger.info("Auto-logging user: " + userData.email)
        delete userData.password
        return res.status(200).json({ ...userData })
    })

}

const logout = async (req, res) => {
    try {
        req.logOut((err) => {
            console.log("user logged out");
            logger.info("User logged out!")
        })

    } catch (error) {

    }
}
const login = async (req, res, next) => {

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.status(500).json(err)
        } else {
            if (user) {
                logger.info("Attempt logging in: " + user.email)

                req.logIn(user, (err) => {
                    if (err) {
                        console.log("Error logging in");
                        logger.error("Error logging in: " + err)

                        console.log(err);
                        return res.status(500).json(err)
                    }
                    let userData = user.get()
                    delete userData.password
                    return res.status(200).json(userData)
                })
            } else {
                logger.error("MethodError: login - " + info)
                return res.status(401).json(info)

            }
        }
    })(req, res, next);
}

const searchUsers = async (req, res) => {

    try {
        let term = req.query
        if (!term || !term.email || term.email === "") {
            return res.status(200)
        }
        let users = await User.findAll({
            where: {
                email: {
                    [Op.like]: `%${term?.email}%`
                }
            },
            attributes: ["id", "email"]
        })
        if (users) {
            return res.status(200).json(users)
        }
    } catch (error) {
        console.log(error)
    }

}

const updateUser = async (req, res) => {
    try {
        let data = req.body
        logger.info("Updating user: " + data?.email)
        await User.update(data, {
            where: {
                id: data.id,
            },
        })
        return res.status(200).json({ toast: "Updated sucessfully" })
    } catch (error) {
        logger.error("MethodError: updateUser - " + error)
    }
}
module.exports = { register, login, loadUser, logout, searchUsers, updateUser }