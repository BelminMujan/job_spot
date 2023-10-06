let messages = []
const cassandra = require("cassandra-driver")

let authProvider = new cassandra.auth.PlainTextAuthProvider(process.env.CASSANDRA_USER, process.env.CASSANDRA_PASS)

module.exports = (server, middleware)=>{
    const io = require("socket.io")(server, {
    path: "/socket",
})

io.use((socket, next) => {
    middleware(socket.request, {}, next)
})

io.on("connection", (socket) => {
    let userId = socket.request?.session?.passport?.user
    if (userId && socket.request.session) {
        console.log("Socket: ", userId);
        if (messages?.length !== 0) {
            console.log("sending messages");
            console.log(messages);
            socket.emit("message", messages)
        }
        socket.on("message", (message) => {
            console.log("Message received");
            console.log(message);
            messages.push(message)
            socket.broadcast.emit("message", message)
        })
    }
})
}



