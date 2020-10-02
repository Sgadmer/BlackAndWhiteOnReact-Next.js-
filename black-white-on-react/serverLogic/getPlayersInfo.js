const getPlayersInfo = (rooms, socket, userData) => { //Получение данных игрока перед началом раунда
    let currentRoom = rooms.get(userData.roomId);
    let playersInfo = currentRoom.get(socket.id);
    let names = currentRoom.get('names');
    socket.emit('resPlayersInfo', {
        card1: playersInfo.get('card1'),
        card2: playersInfo.get('card2'),
        names: [...names],
        numberOfPlayers: currentRoom.get('numberOfPlayers')
    })

}

module.exports = { getPlayersInfo };