//При отключении оповещает игроков в комнате и удаляет игрока из комнаты
//На этапе загрузки уменьшает счетчик игроков на клиенте
const playerDisconnect = (rooms, socket, io) => {

    rooms.forEach((room, roomId) => {
        if (room.has(socket.id)) {
            room.get('names').delete(room.get(socket.id).get('name'))
            room.delete(socket.id)
            room.set('actualNumberOfPlayers', room.get('actualNumberOfPlayers') - 1);
            room.set('numberOfReadyPlayers', room.get('numberOfReadyPlayers') - 1);

            io.to(roomId).emit('userJoin_UserLeave', {
                actualNumberOfPlayers: room.get('actualNumberOfPlayers'),
                numberOfPlayers: room.get('numberOfPlayers')
            });

            if (room.get('actualNumberOfPlayers') == 0) {
                rooms.delete(socket.id)
            }
        }
    })
}

module.exports = { playerDisconnect }