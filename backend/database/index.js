import Sequelize from "sequelize";
import { DB_NAME, DB_PASS, DB_USER } from "../config/index.js";
import { AppError } from "../utils/Error.js";
import log from "../utils/log.js";
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: "localhost",
    dialect: "mysql",
})

sequelize.authenticate().then(() => {
    log("Connecting to db...");
    sequelize.sync({ force: false }).then(() => {
        log("Database synced")
    }).catch(err => {
        log(new AppError("Database error", 500, "Error syncing mysql database", false, err.stack))
    })
}).catch(err => {
    log(new AppError("Database error", 500, "Error connecting mysql database", false, err.stack))
})

export default sequelize