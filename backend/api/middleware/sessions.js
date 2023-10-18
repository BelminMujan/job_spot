import session from "express-session"
import sessionSequelize from "connect-session-sequelize"
import sequelize from "../../database/index.js"
import { SESSION_KEY } from "../../config/index.js";
var SequelizeStore = sessionSequelize(session.Store);
const sessionMiddleware = session({
    name: "sessions",
    secret: SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 10 * 60 * 1000,
        expiration: 7 * 24 * 60 * 60 * 1000
    }),
    proxy: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 100,
        secure: false
    }
})

export default sessionMiddleware

