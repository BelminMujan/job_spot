const logger = require("../../helpers/logger");
const client = require("./cassandra");
const { v4: uuidv4 } = require('uuid');

const sendMessage = async (room_id, from, message) => {
    try {
        const timestamp = new Date().getTime();
        const message_id = uuidv4()
        const query = `INSERT INTO jobspot.messages (room_id, message_id, from_user, message, status, created_at) VALUES (?, ?, ?, ?, ?, now()) if not exists;`;
        const params = [room_id, message_id, parseInt(from), message, 'sent'];
        let res = await client.execute(query, params, { prepare: true })
        if (res && res.rows[0]['[applied]']) {
            return {
                room_id,
                message_id,
                from_user: parseInt(from),
                message,
                status: 'sent',
                created_at: timestamp
            };
        } else {
            return null;
        }
    } catch (err) {
        logger.error("Error sending message in room_id: " + room_id + ", from: " + from)

    }
};

const loadMessagesPerChat = async (room_id) => {
    const query = `SELECT * FROM jobspot.messages WHERE room_id = ?;`
    let params = [room_id]
    try {
        let res = await client.execute(query, params, { prepare: true })
        return res
    } catch (err) {
        logger.error("Error loading messages for room_id: " + room_id)
    }
}
module.exports = { sendMessage, loadMessagesPerChat }