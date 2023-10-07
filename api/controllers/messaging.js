const { sendMessage, loadMessagesPerChat } = require("../services/cassandra/messages")


module.exports = (server, middleware)=>{
    const io = require("socket.io")(server, {
    path: "/socket",
})

io.use((socket, next) => {
    middleware(socket.request, {}, next)
})

io.on("connection", async (socket) => {
    let userId = socket.request?.session?.passport?.user
    if (userId && socket.request.session) {
        let messages = await loadMessagesPerChat(1,2)
        if(messages && messages.rowLength !== 0){
            socket.emit("message", messages.rows)
        }
        // if (messages?.length !== 0) {
        //     console.log("sending messages");
        //     console.log(messages);
        //     socket.emit("message", messages)
        // }
        socket.on("message", async (message) => {
            console.log("Message received");
            let sentMessage = await sendMessage(1, 2, message)
            socket.broadcast.emit("message", sentMessage)
        })
    }
})
}



