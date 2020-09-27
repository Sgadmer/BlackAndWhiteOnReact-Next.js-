const playerReady = (rooms,  userData, io) => { //Событие эмитируемое клиентом после получения данных игрока
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

}

module.exports = { playerReady };