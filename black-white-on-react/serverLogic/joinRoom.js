const { randomInteger } = require("../servicesAndUtilities/getRandomINT");

const joinRoom = (rooms, socket, userData, io) => { //Присоединение игрока к комнате


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

        console.log(`roomToJoin `);
        console.log(roomToJoin);

        setTimeout(() => {
            io.to(userData.roomId).emit('userJoin_UserLeave', { //Оповещение всех игроков в комнате (при загрузке) о входе игрока в комнату
                actualNumberOfPlayers: roomToJoin.get('actualNumberOfPlayers'),
                numberOfPlayers: roomToJoin.get('numberOfPlayers')
            });
        }, 1500);

    } else {
        socket.emit('roomOverfill') //Оповещение игрока о переполнении комнаты
    }

}

module.exports = { joinRoom };