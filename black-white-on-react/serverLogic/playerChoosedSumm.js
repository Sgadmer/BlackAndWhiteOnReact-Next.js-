const { changePlayerTurn } = require("./changePlayerTurn");


//Помечает сыгранную карту игрока и ставит указанную игроком сумму на этой карту у других игроков
const playerChoosedSumm = (rooms, socket, io, userData, summ) => {
    let currentRoom = rooms.get(userData.roomId);
    let playersTurnCounter = currentRoom.get('playersTurnCounter') + 1;
    let currentPlayerTurnCount = currentRoom.get('currentPlayerTurnCount') + 1;
    let actualNumberOfPlayers = currentRoom.get('actualNumberOfPlayers');
    let isAllPlayersMoved = (playersTurnCounter == actualNumberOfPlayers * 2);

    socket.emit('markPlayedCardForCurrentPlayer', summ);
    socket.to(userData.roomId).emit('putSummOnCard', { usData: userData, summ });

    if (isAllPlayersMoved) { //Функция, после того как все игроки сделают ход
        playersTurnCounter = 0;
    }


    //Функция, вызывающая смену игрока, после того как игрок сыграл все карты
    if (currentPlayerTurnCount == 2 && !isAllPlayersMoved) {
        currentPlayerTurnCount = 0;
        changePlayerTurn(rooms, io, userData);
    }

    currentRoom.set('playersTurnCounter', playersTurnCounter);
    currentRoom.set('currentPlayerTurnCount', currentPlayerTurnCount);

    console.log(rooms);
}


module.exports = { playerChoosedSumm };