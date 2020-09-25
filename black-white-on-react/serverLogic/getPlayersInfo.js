const getPlayersInfo = (rooms, socket, userData) => { //Получение данных игрока перед началом раунда
    let roomToJoin = rooms.get(userData.roomId);
    let playersInfo = roomToJoin.get(socket.id);
    let names = roomToJoin.get('names');
    socket.emit('resPlayersInfo', {
        card1: playersInfo.get('card1'),
        card2: playersInfo.get('card2'),
        names: [...names],
        numberOfPlayers: roomToJoin.get('numberOfPlayers')
    })

    console.log(rooms.get(userData.roomId).get('names'));
}

module.exports = { getPlayersInfo};