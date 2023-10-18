import passport from "passport"
import User from "./database/models/user.js"
import bcrypt from "bcrypt"
import passportLocal from "passport-local"
var LocalStrategy = passportLocal.Strategy
passport.use(new LocalStrategy({ usernameField: "email" },
    async function (email, password, done) {
        console.log("authenitacting in local startegy")

        try {
            let user = await User.findOne({ where: { email: email } })
            if (!user) {
                return done(null, null, { message: "Incorect credentials" })
            }
            let passCorrect = await bcrypt.compare(password, user.password)
            if (!passCorrect) {
                return done(null, null, { message: "Incorect credentials" })
            }
            return done(null, user)
        } catch (error) {
            return done(error);

        }
    }
));
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => done(null, User.findByPk(id)))
