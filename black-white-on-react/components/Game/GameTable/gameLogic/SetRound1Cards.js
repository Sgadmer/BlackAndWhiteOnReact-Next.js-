import classes from '../../../../styles/gameTable.module.scss';
import { UserTableName, setUserName, CardText, setCardPosition } from "./cardsAndNamePlatesFiller";
import classNames from 'classnames';
import cardOnMouseEnter from './cardOnMouseEnter';

export default function Round1Cards(
    userNamePlatesArray,
    cardsArray,
    socket,
    { card1, card2, names },
    userData,
    setGameCards,
    setUserNameCards,
    playersTurnName) {

    names = new Set(names);
    names.delete(userData.name);
    names = [...names]


    for (let i = 0; i < userData.numberOfPlayers; i++) {

        userNamePlatesArray.push(
            <div
                key={i}
                className={classNames(classes.userName, classes[`userName${i + 1}`])}>
                {<UserTableName userData={userData} i={i} names={names} />}

            </div>
        );
    }

    for (let i = 0; i < userData.numberOfPlayers * 2; i++) {

        cardsArray.push(
            <div username={setUserName(userData, i, names)}
                cardposition={setCardPosition(i)}
                key={i}
                className={classNames(classes.card, classes[`card${i + 1}`])}
                onMouseEnter={(e) => cardOnMouseEnter(e, socket, userData, playersTurnName)}>

                {<CardText i={i} card1={card1} card2={card2} />}
            </div>);
    }

    userNamePlatesArray.reverse();
    setUserNameCards(userNamePlatesArray)

    cardsArray.reverse();
    setGameCards(cardsArray);

    socket.on('hoverCardForOtherPlayers', ({ name, cardPos }) => {

        alert(`${name} навелся на карту № ${cardPos}`);
    });

}