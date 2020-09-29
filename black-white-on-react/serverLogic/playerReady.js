const playerReady = (rooms, userData, io) => { //Событие эмитируемое клиентом после получения данных игрока
    let currentRoom = rooms.get(userData.roomId);
    let numberOfReadyPlayers = currentRoom.get('numberOfReadyPlayers');
    let names = currentRoom.get('names');
    let playersTurn = currentRoom.get('playersTurn');

    currentRoom.set('numberOfReadyPlayers', numberOfReadyPlayers + 1);


    numberOfReadyPlayers = currentRoom.get('numberOfReadyPlayers');
    if (numberOfReadyPlayers == userData.numberOfPlayers) {

        for (name of names) {
            if (!playersTurn.has(name)) {
                playersTurn.set(name, name)
                currentRoom.set('playersTurnName', name);
                io.to(userData.roomId).emit('startRound', name); //Оповещение клиентов всех игроков в комнате о начале игры
                break;
            }
        }

    }

}

module.exports = { playerReady };