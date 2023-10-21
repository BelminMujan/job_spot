import dotnev from "dotenv"
dotnev.config()
import express from "express"
const app = express()
import http from "http"
import fileUpload from "express-fileupload"

const server = http.createServer(app)

import bodyParser from "body-parser"
import passport from "passport"
import "./passport.config.js"
// import { initializeChat } from "./controllers/messaging"
import path from "path"
import sessionMiddleware from "./api/middleware/sessions.js"
import api from "./api/index.js"
import { fileURLToPath } from 'url';
import { errorMiddleware } from "./utils/Error.js"
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// initializeChat(server, sessionMiddleware)

app.use(bodyParser.json())
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())
app.use('/files', express.static(path.join(__dirname, 'storage')));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use("/api", api)

app.use(errorMiddleware)

server.listen(process.env.PORT, () => console.log("Server started on port " + process.env.PORT))