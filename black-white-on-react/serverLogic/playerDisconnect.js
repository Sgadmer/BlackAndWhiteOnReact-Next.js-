const playerDisconnect = (rooms, socket, io) => { //При отключении оповещает игроков в комнате и удаляет игрока из комнаты
    //На этапе загрузки уменьшает счетчик игроков на клиенте

    rooms.forEach((room, roomId) => {
        if (room.has(socket.id)) {
            room.get('names').delete(room.get(socket.id).get('name'))
            room.delete(socket.id)

            console.log(`--!socket ${socket.id} deleted`);

            room.set('actualNumberOfPlayers', room.get('actualNumberOfPlayers') - 1);
            room.set('numberOfReadyPlayers', room.get('numberOfReadyPlayers') - 1);

            io.to(roomId).emit('userJoin_UserLeave', {
                actualNumberOfPlayers: room.get('actualNumberOfPlayers'),
                numberOfPlayers: room.get('numberOfPlayers')
            });

            if (room.get('actualNumberOfPlayers') == 0) {
                rooms.delete(socket.id)
                console.log(`!!-room ${socket.id} deleted`);
            }
        }
        console.log(rooms);
    })
    console.log(`~~socket Disconnected: ${socket.id}`);
}

module.exports = { playerDisconnect }