import Sequelize from "sequelize";
import logger from "../utils/logger.js";
import { DB_NAME, DB_PASS, DB_USER } from "../config/index.js";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: "localhost",
    dialect: "mysql",
})

sequelize.authenticate().then(() => {
    console.log("Connecting to db...");
    sequelize.sync({ force: false }).then(() => {
        console.log("Database connected and synced");
    }).catch(e => {
        console.log("Error syncing db");
        logger.error("Error sycing sequelize db: " + e)
    })
}).catch(e => {
    logger.error("Error connecting sequelize db: " + e)

})

export default sequelize