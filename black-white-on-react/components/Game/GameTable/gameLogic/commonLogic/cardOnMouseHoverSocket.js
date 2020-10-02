//Эмитирует событие, когда текущий игрок наводит мышь на карту, чтобы эта карта выделилась у остальных игроков
export default function cardOnMouseHover(e, socket, userData, hoverCase) {
    e.persist();
    let attributes = e.target.attributes;
    let cardUserName = attributes.userName.value;

    if (userData.name == userData.playersTurnName
        && userData.name == cardUserName

    ) {


        let cardPos = attributes.cardPosition.value;
        socket.emit('playerHoveredCard', { userData, cardPos, hoverCase });

    }



}
