const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 8080;
const { createRoom } = require('./serverLogic/createRoom');
const { checkNameOnBusy } = require('./serverLogic/checkNameOnBusy');
const { joinRoom } = require('./serverLogic/joinRoom');
const { getPlayersInfo } = require('./serverLogic/getPlayersInfo');
const { playerReady } = require('./serverLogic/playerReady');
const { playerHoveredCard } = require('./serverLogic/playerHoveredCard');
const { playerDisconnect } = require('./serverLogic/playerDisconnect');


const rooms = new Map();


io.on('connection', (socket) => { //Присоединение игрока
    
    console.log(`++socket Conected: ${socket.id}`);
    setTimeout(() => {
        socket.emit('socketConnected', ''); //Оповещение клиента, о подключении игрока к серверу
    }, 1500);

    socket.on('createRoom', (userData, roomIdMD5) => createRoom(rooms, socket, userData, roomIdMD5, socket));

    socket.on('checkNameOnBusy', (roomId, name) => checkNameOnBusy(rooms, socket, roomId, name));

    socket.on('joinRoom', (userData) => joinRoom(rooms, socket, userData, io));

    socket.on('getPlayersInfo', (userData) => getPlayersInfo(rooms, socket, userData));

    socket.on('playerReady', (userData) => playerReady(rooms, socket, userData, io));

    socket.on('playerHoveredCard', ({ userData, cardPos }) => playerHoveredCard(socket, userData, cardPos));

    socket.on('disconnect', () => playerDisconnect(rooms, socket, io));
});

server.listen(port, (err) => {//Оповещении об удачном или неудавшемся запуске сервера
    if (err) {
        throw Error(err);
    }
    console.log('!!!Server has been started!!!');
})

