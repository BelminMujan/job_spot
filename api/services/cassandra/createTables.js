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


const createTables = async (client)=>{
    await [createMessagesTableQuery, createUsersTableQuery].forEach(async(qq)=>{
      await client.execute(qq)
      .then(() => {
        console.log('Table created or already exists');
      })
      .then(() => {
        console.log('Index created or already exists');
      })
      .catch(error => {
        console.error('Error creating table or index:', error);
      });
    })



}


module.exports = createTables