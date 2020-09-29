//Оповещает всех игроков в комнате, что ходящий навел мышку на карту

const playerHoveredCard = (socket, userData, cardPos, hoverCase) => {
    socket.to(userData.roomId).emit('hoverCardForOtherPlayers', { name: userData.name, cardPos, hoverCase });
}

module.exports = { playerHoveredCard };