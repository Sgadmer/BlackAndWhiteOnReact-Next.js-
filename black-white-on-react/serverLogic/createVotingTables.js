//Запускает на клиенте голосование против игрока - лжеца

const createVotingTables = (rooms, userData, io) => {

    let currentRoom = rooms.get(userData.roomId);
    let names = currentRoom.get('names');
    names = [...names];

    io.to(userData.roomId).emit('createVotingTables', names);

}

module.exports = { createVotingTables };