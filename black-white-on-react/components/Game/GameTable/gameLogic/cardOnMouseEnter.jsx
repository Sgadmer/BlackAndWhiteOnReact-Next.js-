
export default function cardOnMouseEnter(e, socket, userData, playersTurnName) {
    e.persist();
    let attributes = e.target.attributes;
    let cardUserName = attributes.userName.value;


    if (userData.name == playersTurnName && userData.name == cardUserName) {
        
        let cardPos = attributes.cardPosition.value;
        socket.emit('playerHoveredCard', { userData, cardPos });
    }


}