const client = require("./cassandra");
const { v4: uuidv4 } = require('uuid');

const sendMessage = async (from, to, message) => {
    try {
        const timestamp = new Date().getTime();
        const query = `INSERT INTO jobspot.messages (message_id, from_user, to_user, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?) if not exists;`;
        let message_id = uuidv4()
        const params = [message_id, parseInt(from), parseInt(to), message, 'sent', timestamp];
        let res = await client.execute(query, params, { prepare: true })
        if (res && res.rows[0]['[applied]']) {
            return {
                message_id,
                from_user: parseInt(from),
                to_user: parseInt(to),
                message,
                status: 'sent',
                created_at: timestamp
            };
        } else {
            return null;
        }    
    } catch (err) {
        console.log("Send message error", err);
    }
};

const loadMessagesPerChat = async (from, to)=>{
    const query = `select * from jobspot.messages where from_user = ? and to_user = ?;`
    let params = [parseInt(from), parseInt(to)]
    try {
        let res = await client.execute(query, params, {prepare: true})
        return res
    } catch (err) {
        console.log("Error loading messages: ", err)
    }
    
    
}
module.exports = {sendMessage,loadMessagesPerChat}