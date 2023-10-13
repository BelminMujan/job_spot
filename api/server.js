const express = require("express")
const app = express()
const http = require("http")
const fileUpload = require("express-fileupload")
const server = http.createServer(app)

require("dotenv").config()
const { sequelize } = require("./database")

const bodyParser = require("body-parser")
const passport = require("passport")
const session = require("express-session")
require("./passport.config.js")
const { initializeChat } = require("./controllers/messaging")
const path = require("path")
var SequelizeStore = require("connect-session-sequelize")(session.Store);


const sessionMiddleware = session({
    name: "sessions",
    secret: process.env.SESSION_KEY,
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
initializeChat(server, sessionMiddleware)

app.use(bodyParser.json())
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())
app.use('/files', express.static(path.join(__dirname, 'storage')));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));



app.use("/api", require("./routes/index"))

server.listen(process.env.PORT, () => console.log("Server is listening on port " + process.env.PORT))