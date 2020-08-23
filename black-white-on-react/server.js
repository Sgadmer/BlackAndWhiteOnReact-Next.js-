const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 8080;

const rooms = new Map();

app.get('/', (req, res) => {
    console.log('MainPage');
    res.set('Access-Control-Allow-Origin', '*');
    res.send(`wefwefwefwe`);
});

io.on('connection', (socket) => {
    console.log(`++socket Conected: ${socket.id}`);

    setTimeout(() => {
        socket.emit('socketConnected', '');
    }, 1500);

    socket.on('createRoom', (userData) => {
        rooms.set(socket.id, { numberOfPlayers: userData.numberOfPlayers, actualNumberOfPlayers: 0 })
        console.log(rooms);

        setTimeout(() => {
            socket.emit('roomCreated', '');
        }, 1500);
    });

    socket.on('joinRoom', (userData) => {

        let roomToJoin = rooms.get(userData.roomId)
        if (roomToJoin.actualNumberOfPlayers < roomToJoin.numberOfPlayers) {

            roomToJoin[socket.id] = new Map()
            roomToJoin.actualNumberOfPlayers += 1;

            socket.join(userData.roomId);
            console.log(rooms);

            setTimeout(() => {
                io.to(userData.roomId).emit('roomJoined', { actualNumberOfPlayers: roomToJoin.actualNumberOfPlayers, numberOfPlayers: userData.numberOfPlayers });
            }, 1500);
        } else {
            socket.emit('roomOverfill')
        }

    });


    socket.on('disconnect', () => {

        rooms.forEach((room) => {
            if (room.has(socket.id)) {
                room.delete(socket.id)
                console.log(`--!socket ${socket.id} deleted`);
                room.actualNumberOfPlayers -= 1
                if (room.actualNumberOfPlayers == 0) {
                    rooms.delete(socket.id)
                }
            }
            console.log(room);
        })
        console.log(`~~socket Disconnected: ${socket.id}`);
    })
})

server.listen(port, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('!!!Server has been started!!!');
})

