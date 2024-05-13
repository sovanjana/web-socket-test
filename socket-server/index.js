const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();


app.use(cors());
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", socket => {
    console.log(`Connected User: ${socket.id}`);

    socket.on("send_message", data => {
        socket.broadcast.emit("receive_message", data);
    })
})

httpServer.listen(3001, () => {
    console.log("SERVER IS RUNNING");
})