import Sequelize from "sequelize";
import { DB_NAME, DB_PASS, DB_USER } from "../config/index.js";
import { AppError } from "../utils/Error.js";
import Logger from "../utils/log.js";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: "localhost",
    dialect: "mysql",
})

sequelize.authenticate().then(() => {
    console.log("Connecting to db...");
    sequelize.sync({ force: false }).then(() => {
        Logger.loginfo("Database synced")
    }).catch(err => {
        console.log("Error syncing db");
        throw new AppError("Database error", 500, "Error syncing mysql database", true, err.stack)
    })
}).catch(err => {
    throw new AppError("Database error", 500, "Error connecting mysql database", true, err.stack)

})

export default sequelize