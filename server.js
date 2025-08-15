const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let devices = {}; // { socketId: { name, ip } }

// Handle device connection
io.on('connection', (socket) => {
    socket.on('register-device', (deviceName) => {
        devices[socket.id] = { name: deviceName, ip: socket.handshake.address };
        io.emit('device-list', devices);
    });

    socket.on('voice-command', ({ targetId, command }) => {
        io.to(targetId).emit('execute-command', command);
    });

    socket.on('disconnect', () => {
        delete devices[socket.id];
        io.emit('device-list', devices);
    });
});

server.listen(3000, () => {
    console.log('🌐 Server running on port 3000');
});
