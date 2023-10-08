const User = require("../models/user")
const { sendMessage, loadMessagesPerChat } = require("../services/cassandra/messages")
const { createRoom, loadRoomsForUser } = require("../services/cassandra/rooms")



const initializeChat = (server, middleware) => {
    const io = require("socket.io")(server, {
        path: "/socket",
    })

    io.use((socket, next) => {
        middleware(socket.request, {}, next)
    })


    io.on("connection", async (socket) => {
        let userId = socket.request?.session?.passport?.user

        if (userId && socket.request.session) {

            socket.once("join_room", async (participant) => {
                let room = await createRoom(userId, participant)
                socket.join(room.room_id)
                socket.emit("joined_room", room.room_id)
                let messages = await loadMessagesPerChat(room.room_id)
                if (messages && messages.rowLength !== 0) {
                    io.to(room.room_id).emit("load_messages", messages.rows)
                }
            })


            socket.on("load_messages", async () => {
                console.log("Loading messages in room: ", roomName);
                let messages = await loadMessagesPerChat(userId, participant)
                if (messages && messages.rowLength !== 0) {
                    io.to(roomName).emit("message", messages.rows)
                }
            })


            socket.on("message", async (data) => {
                console.log("Message received");
                console.log(data);
                let sentMessage = await sendMessage(data.room_id, userId, data.message)
                io.to(data.room_id).emit("message", sentMessage)
            })
        }
    })
}

const loadRooms = async (req, res) => {
    try {
        let user = await req.user
        let rooms = await loadRoomsForUser(user.id)
        console.log(rooms);
        let participantIds = rooms?.map(rr => ([rr.user1, rr.user2]))
        if(participantIds && participantIds.length !== 0){
            participantIds=participantIds.reduce((a, b) => (a.concat(b)))
            participantIds = participantIds.filter(uid => uid !== user.id)
            let users = await User.findAll({ where: { id: participantIds }, attributes: ["id", "email"] })
            return res.status(200).json(users)
        }
        return res.status(200)
    
    } catch (err) {
        console.log("Error loading rooms: ", err)
    }
}



module.exports = { initializeChat, loadRooms }
