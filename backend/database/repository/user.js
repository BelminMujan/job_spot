import User from "../models/user.js";

export default class UserRepository {
    async createUser(email, password) {
        try {
            const user = new User({
                email,
                password
            })
            let savedUser = user.save()
            return savedUser
        } catch (err) {
            throw new Error("Error saving user")
        }

    }
    updateUser(data) { }
    deleteUser(id) { }
    async loadUser(id) {
        try {
            let user = await User.findByPk(id)
            delete user.password
            return user
        } catch (error) {
            throw new Error("Error getting user")
        }
    }
}