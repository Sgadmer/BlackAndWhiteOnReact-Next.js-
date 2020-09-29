const checkNameOnBusy = (rooms, socket, roomId, name) => { //Проверка индивидуальности имени игрока
    let currentRoom = rooms.get(roomId);
    let names = currentRoom.get('names');

    let res = names.has(name);

    setTimeout(() => {
        socket.emit('checkNameRes', { res: res });  //Оповещение клиента о индивидуальности имени игрока
    }, 1500);
}


module.exports = { checkNameOnBusy };