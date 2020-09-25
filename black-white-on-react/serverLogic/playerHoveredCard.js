const playerHoveredCard = (socket, userData, cardPos ) => { //Оповещает всех игроков в комнате, что ходящий навел мышку на карту
    //FUTURE (front): сделать красивый эффект у других игроков на наведенной ходящим карте
    console.log(userData, cardPos);
    socket.to(userData.roomId).emit('hoverCardForOtherPlayers', { name: userData.name, cardPos });
}

module.exports = { playerHoveredCard };