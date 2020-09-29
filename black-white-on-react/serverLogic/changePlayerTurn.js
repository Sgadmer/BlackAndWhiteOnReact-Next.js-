const changePlayerTurn = (rooms, io, userData) => { //Меняет ходящего игрока на следующего и оповещает клиенты
    let currentRoom = rooms.get(userData.roomId);
    let names = currentRoom.get('names');
    let playersTurn = currentRoom.get('playersTurn');


    for (name of names) {
        if (!playersTurn.has(name)) {
            playersTurn.set(name, name);
            currentRoom.set('playersTurnName', name);
            io.to(userData.roomId).emit('changePlayerTurn', { name });
            break;
        }
    }


}

module.exports = { changePlayerTurn };