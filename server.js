const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("Um cliente se conectou");

    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`Cliente entrou no canal: ${room}`);
    });

    socket.on('send_message', ({ room, message }) => {
        console.log(`Mensagem recebida na ${room}: ${message}`);
        
        // Emite a mensagem para a outra sala
        if (room === 'room1') {
            io.to('room2').emit('receive_message', { room: 'room2', message });
        } else {
            io.to('room1').emit('receive_message', { room: 'room1', message });
        }
    });

    socket.on("disconnect", () => {
        console.log("Um cliente se desconectou");
    });
});

server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
