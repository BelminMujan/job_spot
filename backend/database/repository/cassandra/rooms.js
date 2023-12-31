import log from "../../../utils/log.js"
import client from "./cassandra.js"
import { v4 as uuidv4 } from 'uuid'

const createRoom = async (u1, u2) => {
    try {
        room_id = `room_${u1 > u2 ? u1 : u2}_${u1 < u2 ? u1 : u2}`
        const query = `INSERT INTO jobspot.rooms (room_id, user1, user2) VALUES (?,?,?) if not exists;`;
        const params = [room_id, parseInt(u1), parseInt(u2)];
        await client.execute(query, params, { prepare: true })
        return {
            room_id: room_id,
            user1: u1,
            user2: u2,
        };
    } catch (err) {
        log("Error creating room: " + err)
    }
};

const loadRoomsForUser = async (userId) => {
    try {
        const query1 = `SELECT user1, user2 FROM jobspot.rooms WHERE user1 = ?  ALLOW FILTERING;`
        const query2 = `SELECT user1, user2 FROM jobspot.rooms WHERE user2 = ?  ALLOW FILTERING;`
        let rooms1 = await client.execute(query1, [parseInt(userId)], { prepare: true })
        let rooms2 = await client.execute(query2, [parseInt(userId)], { prepare: true })
        return [...rooms1.rows, ...rooms2.rows]
    } catch (error) {
        log("Error loading rooms for users: " + err)
    }

}



export { createRoom, loadRoomsForUser }