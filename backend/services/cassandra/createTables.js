import { AppError } from "../../utils/Error.js";
import { loginfo } from "../../utils/log.js"

const createMessagesTableQuery = `CREATE TABLE IF NOT EXISTS jobspot.messages (
    message_id UUID,
    room_id TEXT,
    from_user INT,
    message TEXT,
    status TEXT,
    created_at timeuuid,
    PRIMARY KEY (room_id, created_at)
) WITH CLUSTERING ORDER BY (created_at ASC);`;

const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS jobspot.rooms (
  room_id TEXT,
  user1 INT,
  user2 INT,
  PRIMARY KEY (room_id)
);`;


const createTables = async (client) => {
  try {
    loginfo("Migrating cassandra tables!")
    [createMessagesTableQuery, createUsersTableQuery].forEach(async (qq) => {
      await client.execute(qq)
        .then(() => {
          loginfo('Table created or already exists');
        })
        .then(() => {
          loginfo('Index created or already exists');
        })
        .catch(error => {
          throw new AppError("Cassandra error", 500, "Error creating table or index", true, error?.stack)
        });
    })
  } catch (error) {
    throw new AppError("Cassandra error", 500, "Error creating cassandra databases", true, error.stack)
  }
}


export default createTables