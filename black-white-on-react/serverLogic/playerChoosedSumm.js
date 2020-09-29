const { changePlayerTurn } = require("./changePlayerTurn");

const playerChoosedSumm = (rooms, socket, io, userData, summ) => {
    let currentRoom = rooms.get(userData.roomId);
    let playersTurnCounter = currentRoom.get('playersTurnCounter') + 1;
    let currentPlayerTurnCount = currentRoom.get('currentPlayerTurnCount') + 1;
    let actualNumberOfPlayers = currentRoom.get('actualNumberOfPlayers');
    let isAllPlayersMoved = (playersTurnCounter == actualNumberOfPlayers * 2);

    socket.emit('markPlayedCardForCurrentPlayer', summ);
    socket.to(userData.roomId).emit('putSummOnCard', { usData: userData, summ });

    if (isAllPlayersMoved) {
        playersTurnCounter = 0;
    }

    if (currentPlayerTurnCount == 2 && !isAllPlayersMoved) {
        currentPlayerTurnCount = 0;
        changePlayerTurn(rooms, io, userData);
    }

    currentRoom.set('playersTurnCounter', playersTurnCounter);
    currentRoom.set('currentPlayerTurnCount', currentPlayerTurnCount);

    console.log(rooms);
}


module.exports = { playerChoosedSumm };