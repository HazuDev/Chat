const express = require("express")
const path = require("path")
const socketio = require("socket.io")
const http = require("http")

const app = express()
const port = process.env.PORT || 8000

const server = http.createServer(app)
const io = new socketio.Server(server)

app.use(express.static(path.join(__dirname + "/public")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"))
})

io.on("connection", (socket) => {
    socket.on("chat-msg", (msg) => {
        io.emit("chat-msg", msg)
    })
})

server.listen(port, () => {
    console.log(`http://localhost:${port}`)
})