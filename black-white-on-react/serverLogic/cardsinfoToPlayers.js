const cardsinfoToPlayers = (rooms, userData) => {
    let currentRoom = rooms.get(userData.roomId);
    let IDs = currentRoom.get('IDs');
    let cardsInfo = {};

    let currentPlayer;
    for (let id of IDs) {
        currentPlayer = currentRoom.get(id);
        cardsInfo[id] = Object.fromEntries(currentPlayer.entries());
    }

    return cardsInfo;

}

module.exports = { cardsinfoToPlayers };