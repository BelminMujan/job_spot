const Sequelize = require("sequelize")

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "mysql",
})

sequelize.authenticate().then(() => {
    console.log("Connecting to db...");
    sequelize.sync({ force: false }).then(() => {
        console.log("Database connected and synced");
    }).catch(e => {
        console.log("Error syncing db");
    })
}).catch(e => {
    console.log("Error connecting db");
})

module.exports = { sequelize }