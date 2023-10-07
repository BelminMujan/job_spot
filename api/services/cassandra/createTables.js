const createTableQuery = `CREATE TABLE IF NOT EXISTS jobspot.messages (
    message_id UUID,
    from_user INT,
    to_user INT,
    message TEXT,
    status TEXT,
    created_at BIGINT,
    PRIMARY KEY ((from_user, to_user), created_at)
) WITH CLUSTERING ORDER BY (created_at ASC);`;

const createIndexQuery = `CREATE INDEX IF NOT EXISTS chat_messages_users ON jobspot.messages (from_user);`;

const createTables = (client)=>{
    client.execute(createTableQuery)
    .then(() => {
      console.log('Table created or already exists');
      return client.execute(createIndexQuery);
    })
    .then(() => {
      console.log('Index created or already exists');
    })
    .catch(error => {
      console.error('Error creating table or index:', error);
    });
}


module.exports = createTables