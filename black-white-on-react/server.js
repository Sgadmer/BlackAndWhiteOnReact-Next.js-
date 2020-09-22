//FUTURE(back): Разбить файл на маленькие модули

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 8080;
const { randomInteger } = require('./components/Game/getRandomINT.js');


const rooms = new Map();


io.on('connection', (socket) => { //Присоединение игрока
    console.log(`++socket Conected: ${socket.id}`);

    setTimeout(() => {
        socket.emit('socketConnected', ''); //Оповещение клиента, о подключении игрока к серверу
    }, 1500);

    socket.on('createRoom', (userData) => { //Создание игровой комнаты
        console.log(`players data `, userData);
        rooms.set(socket.id, new Map([
            ['numberOfPlayers', userData.numberOfPlayers],
            ['actualNumberOfPlayers', 0],
            ['numberOfReadyPlayers', 0],
            ['names', new Set()],
            ['playersTurn', new Map()]
        ]))

        setTimeout(() => {
            socket.emit('roomCreated', '');//Оповещение клиента, о создании комнаты
        }, 1500);
    });

    socket.on('checkNameOnBusy', (roomId, name) => { //Проверка индивидуальности имени игрока
        let roomToJoin = rooms.get(roomId);
        let names = roomToJoin.get('names');

        let res = names.has(name);

        setTimeout(() => {
            socket.emit('checkNameRes', { res: res });  //Оповещение клиента о индивидуальности имени игрока
        }, 1500);
    })

    socket.on('joinRoom', (userData) => { //Присоединение игрока к комнате

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
                io.to(userData.roomId).emit('userJoin_UserLeave', { //Оповещение всех игроков в комнате (при загрузке) о входе игрока в комнату
                    actualNumberOfPlayers: roomToJoin.get('actualNumberOfPlayers'),
                    numberOfPlayers: userData.numberOfPlayers
                });
            }, 1500);

        } else {
            socket.emit('roomOverfill') //Оповещение игрока о переполнении комнаты
        }

    });

    socket.on('getPlayersInfo', (userData) => { //Получение данных игрока перед началом раунда
        let playersInfo = rooms.get(userData.roomId).get(socket.id);
        let names = rooms.get(userData.roomId).get('names');
        socket.emit('resPlayersInfo', {
            card1: playersInfo.get('card1'),
            card2: playersInfo.get('card2'),
            names: [...names],

        })

        console.log(rooms.get(userData.roomId).get('names'));
    });

    socket.on('playerReady', (userData) => { //Событие эмитируемое клиентом после получения данных игрока
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
                    io.to(userData.roomId).emit('startRound', name); //Оповещение клиентов всех игроков в комнате о начале игры
                    break;
                }
            }

        }

    });


    socket.on('playerHoveredCard', ({ userData, cardPos }) => { //Оповещает всех игроков в комнате, что ходящий навел мышку на карту
                                                                //FUTURE (front): сделать красивый эффект у других игроков на наведенной ходящим карте
        console.log(userData, cardPos);
        socket.to(userData.roomId).emit('hoverCardForOtherPlayers', { name: userData.name, cardPos });
    });


    socket.on('disconnect', () => { //При отключении оповещает игроков в комнате и удаляет игрока из комнаты
                                    //На этапе загрузки уменьшает счетчик игроков на клиенте
        
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

server.listen(port, (err) => {//Оповещении об удачном или неудавшемся запуске сервера
    if (err) {
        throw Error(err);
    }
    console.log('!!!Server has been started!!!');
})

