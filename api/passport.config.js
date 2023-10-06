const passport = require("passport");
const User = require("./models/user")
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy

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
