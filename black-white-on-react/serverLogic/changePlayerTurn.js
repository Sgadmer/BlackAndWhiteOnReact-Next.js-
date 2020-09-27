const changePlayerTurn = (rooms, userData, io) => { 
    let roomToJoin = rooms.get(userData.roomId);
    let names = roomToJoin.get('names');
    let playersTurn = roomToJoin.get('playersTurn');


        for (name of names) {
            if (!playersTurn.has(name)) {
                console.log(names, name)
                playersTurn.set(name, name)
                io.to(userData.roomId).emit('resPlayerTurnName', name); 
                break;
            }
        }


}

module.exports = { changePlayerTurn };