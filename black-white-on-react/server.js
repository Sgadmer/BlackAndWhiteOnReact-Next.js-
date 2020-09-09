//FUTURE: Разбить файл на маленькие модули

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 8080;
const { randomInteger } = require('./components/Game/getRandomINT');


const rooms = new Map();


io.on('connection', (socket) => {
    console.log(`++socket Conected: ${socket.id}`);

    setTimeout(() => {
        socket.emit('socketConnected', '');
    }, 1500);

    socket.on('createRoom', (userData) => {
        console.log(`players data `, userData);
        rooms.set(socket.id, new Map([
            ['numberOfPlayers', userData.numberOfPlayers],
            ['actualNumberOfPlayers', 0],
            ['numberOfReadyPlayers', 0],
            ['names', new Set()],
            ['playersTurn', new Map()]
        ]))

        setTimeout(() => {
            socket.emit('roomCreated', '');
        }, 1500);
    });

    socket.on('checkNameOnBusy', (roomId, name) => {
        let roomToJoin = rooms.get(roomId);
        let names = roomToJoin.get('names');

        let res = names.has(name);

        setTimeout(() => {
            socket.emit('checkNameRes', { res: res });
        }, 1500);
    })

    socket.on('joinRoom', (userData) => {

        let roomToJoin = rooms.get(userData.roomId);
        if (roomToJoin.get('actualNumberOfPlayers') < roomToJoin.get('numberOfPlayers')) {

            let names = roomToJoin.get('names');
            names.add(userData.name)
            roomToJoin.set(socket.id, new Map([
                ['name', userData.name],
                ['card1', randomInteger()],
                ['card2', randomInteger()]
            ]))
            roomToJoin.set('actualNumberOfPlayers', roomToJoin.get('actualNumberOfPlayers') + 1);

            socket.join(userData.roomId);
            console.log(rooms);

            setTimeout(() => {
                io.to(userData.roomId).emit('userJoin_UserLeave', {
                    actualNumberOfPlayers: roomToJoin.get('actualNumberOfPlayers'),
                    numberOfPlayers: userData.numberOfPlayers
                });
            }, 1500);

        } else {
            socket.emit('roomOverfill')
        }

    });

    socket.on('getPlayersInfo', (userData) => {
        let playersInfo = rooms.get(userData.roomId).get(socket.id);
        let names = rooms.get(userData.roomId).get('names');
        socket.emit('resPlayersInfo', {
            card1: playersInfo.get('card1'),
            card2: playersInfo.get('card2'),
            names: [...names],

        })

        console.log(rooms.get(userData.roomId).get('names'));
    });

    socket.on('playerReady', (userData) => {
        let roomToJoin = rooms.get(userData.roomId);
        let numberOfReadyPlayers = roomToJoin.get('numberOfReadyPlayers');
        let names = roomToJoin.get('names');
        let playersTurn = roomToJoin.get('playersTurn');

        roomToJoin.set('numberOfReadyPlayers', numberOfReadyPlayers + 1);


        numberOfReadyPlayers = roomToJoin.get('numberOfReadyPlayers');
        if (numberOfReadyPlayers == userData.numberOfPlayers) {

            for (name of names) {
                if (!playersTurn.has(name)) {
                    console.log(names, name)
                    playersTurn.set(name, name)
                    io.to(userData.roomId).emit('startRound', name);
                    break;
                }
            }

        }

    });


    socket.on('playerHoveredCard', ({ userData, cardPos }) => {
        console.log(userData, cardPos);
        socket.to(userData.roomId).emit('hoverCardForOtherPlayers', { name: userData.name, cardPos });
    });


    socket.on('disconnect', () => {


        rooms.forEach((room, roomId) => {
            if (room.has(socket.id)) {
                room.get('names').delete(room.get(socket.id).get('name'))
                room.delete(socket.id)

                console.log(`--!socket ${socket.id} deleted`);

                room.set('actualNumberOfPlayers', room.get('actualNumberOfPlayers') - 1);
                room.set('numberOfReadyPlayers', room.get('numberOfReadyPlayers') - 1);

                io.to(roomId).emit('userJoin_UserLeave', {
                    actualNumberOfPlayers: room.get('actualNumberOfPlayers'),
                    numberOfPlayers: room.get('numberOfPlayers')
                });

                if (room.get('actualNumberOfPlayers') == 0) {
                    rooms.delete(socket.id)
                    console.log(`!!-room ${socket.id} deleted`);
                }
            }
            console.log(rooms);
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

