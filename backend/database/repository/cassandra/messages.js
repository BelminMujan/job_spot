import { AppError } from "../../../utils/Error.js";
import log from "../../../utils/log.js"
import client from "./cassandra.js"
import { v4 as uuidv4 } from 'uuid'

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
        log(new AppError("Api error", 500, "Eror sending message in chat with room_id " + room_id + ", from: " + from, true, err.stack))
    }
};

const loadMessagesPerChat = async (room_id) => {
    const query = `SELECT * FROM jobspot.messages WHERE room_id = ?;`
    let params = [room_id]
    try {
        let res = await client.execute(query, params, { prepare: true })
        return res
    } catch (err) {
        log(new AppError("Cassandra error", 500, "Error loading messages for chat" + room_id, true, err.stack))
    }
}
export { sendMessage, loadMessagesPerChat }