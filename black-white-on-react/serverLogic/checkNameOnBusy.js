const checkNameOnBusy = (rooms, socket, roomId, name) => { //Проверка индивидуальности имени игрока
    let roomToJoin = rooms.get(roomId);
    let names = roomToJoin.get('names');

    let res = names.has(name);

    setTimeout(() => {
        socket.emit('checkNameRes', { res: res });  //Оповещение клиента о индивидуальности имени игрока
    }, 1500);
}


module.exports = { checkNameOnBusy };