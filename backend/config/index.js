import dotenv from "dotenv"
dotenv.config()

const { PORT, DB_USER, DB_NAME, DB_PASS, CASSANDRA_USER, CASSANDRA_PASS, SESSION_KEY } = process.env
if (!PORT || !DB_USER || !DB_NAME || !DB_PASS || !CASSANDRA_USER || !CASSANDRA_PASS || !SESSION_KEY) {
    throw new Error("Cannot read environmental variables!")
}

export { PORT, DB_USER, DB_NAME, DB_PASS, CASSANDRA_USER, CASSANDRA_PASS, SESSION_KEY }