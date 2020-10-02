const { cardsinfoToPlayers } = require("./cardsinfoToPlayers");

//Логика голосования против игрока
const playerVoted = (rooms, userData, io, playersName) => {
    let currentRoom = rooms.get(userData.roomId);
    let numberOfVotedPlayers = currentRoom.get('numberOfVotedPlayers');
    let playersVote = currentRoom.get('playersVote');

    let voiceCount = 1;
    if (playersVote.has(playersName)) {
        voiceCount = playersVote.get(playersName) + 1;
    }

    playersVote.set(playersName, voiceCount);

    currentRoom.set('numberOfVotedPlayers', numberOfVotedPlayers + 1);
    numberOfVotedPlayers = currentRoom.get('numberOfVotedPlayers');

    //Когда все проголосуют определяет проигравшего
    if (numberOfVotedPlayers == userData.numberOfPlayers) {


        let maxVoiceNumber = 0;
        let looserName;

        playersVote.forEach((value, key) => {
            maxVoiceNumber = Math.max(maxVoiceNumber, value)
            if (maxVoiceNumber == value) {
                looserName = key;
            }
        });



        function reloadVoting() {
            playersVote.clear();
            currentRoom.set('numberOfVotedPlayers', 0);
        }

        function introduceLooser() {
            let cardsInfo = cardsinfoToPlayers(rooms, userData);
            io.to(userData.roomId).emit('introduceLooser', { looserName, cardsInfo });
        }


        //Если за двух игроков по 2 голоса (в случае с 4 игроками)
        if (maxVoiceNumber == 2) {
            let twoVoiceCounter = 0;
            playersVote.forEach((value) => {

                //Если игроков с 2 голосами 2, то голосуют еще раз
                if (value == 2) {
                    twoVoiceCounter++;
                } else {
                    //Иначе представить проигравшего
                    introduceLooser();

                }
            });

            if (twoVoiceCounter == 2) {
                io.to(userData.roomId).emit('noLoserSelected');
                reloadVoting();
            }


            //Если за кождого игрока по 1 голосу, то голосуют еще раз
        } else if (maxVoiceNumber == 1) {
            io.to(userData.roomId).emit('noLoserSelected');
            reloadVoting();
        } else {
            introduceLooser();
        }

    }

}


module.exports = { playerVoted };