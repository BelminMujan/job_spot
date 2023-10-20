import Sequelize from "sequelize";
import logger from "../utils/log.js";
import { DB_NAME, DB_PASS, DB_USER } from "../config/index.js";
import { AppError } from "../utils/Error.js";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: "localhost",
    dialect: "mysql",
})

sequelize.authenticate().then(() => {
    console.log("Connecting to db...");
    sequelize.sync({ force: false }).then(() => {
        logger("Database synced")
    }).catch(e => {
        console.log("Error syncing db");
        throw new AppError("Database error", 500, "Error syncing mysql database", true, err.stack)
    })
}).catch(e => {
    throw new AppError("Database error", 500, "Error connecting mysql database", true, e.stack)

})

export default sequelize