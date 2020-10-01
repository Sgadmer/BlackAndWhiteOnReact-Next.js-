const { changePlayerTurn } = require("./changePlayerTurn");
const { createVotingTables } = require("./createVotingTables");


//Помечает сыгранную карту игрока и ставит указанную игроком сумму на этой карту у других игроков
const playerChoosedSumm = (rooms, socket, io, userData, summ) => {
    let currentRoom = rooms.get(userData.roomId);
    let currentPlayer = currentRoom.get(socket.id);
    let playersTurnCounter = currentRoom.get('playersTurnCounter') + 1;
    let currentPlayerTurnCount = currentRoom.get('currentPlayerTurnCount') + 1;
    let actualNumberOfPlayers = currentRoom.get('actualNumberOfPlayers');
    let isAllPlayersMoved = (playersTurnCounter == actualNumberOfPlayers * 2);


    currentPlayer.set(`playerCard${userData.selectedCardPos}`, summ);
    socket.emit('markPlayedCardForCurrentPlayer', summ);
    socket.to(userData.roomId).emit('putSummOnCard', { usData: userData, summ });

    if (isAllPlayersMoved) { //Функция, после того как все игроки сделают ход
        playersTurnCounter = 0;
        createVotingTables(rooms, userData, io);
    }


    //Функция, вызывающая смену игрока, после того как игрок сыграл все карты
    if (currentPlayerTurnCount == 2 && !isAllPlayersMoved) {
        currentPlayerTurnCount = 0;
        changePlayerTurn(rooms, io, userData);
    }

    currentRoom.set('playersTurnCounter', playersTurnCounter);
    currentRoom.set('currentPlayerTurnCount', currentPlayerTurnCount);

}


module.exports = { playerChoosedSumm };