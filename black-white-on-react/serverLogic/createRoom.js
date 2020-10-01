const createRoom = (rooms, socket, userData, roomIdMD5,) => { //Создание игровой комнаты

    rooms.set(roomIdMD5, new Map([
        ['numberOfPlayers', userData.numberOfPlayers],
        ['actualNumberOfPlayers', 0],
        ['numberOfReadyPlayers', 0],
        ['names', new Set()],
        ['IDs', new Set()],
        ['playersTurn', new Map()],
        ['playersTurnName', ''],
        ['playersTurnCounter', 0],
        ['currentPlayerTurnCount', 0],
        ['numberOfVotedPlayers', 0],
        ['playersVote', new Map()]
    ]));

    setTimeout(() => {
        socket.emit('roomCreated', '');//Оповещение клиента, о создании комнаты
    }, 1500);
}

module.exports = { createRoom };