import classes from '../../../../../styles/gameTable.module.scss';
import { UserTableName, setUserName, CardText, setCardPosition } from "../commonLogic/cardsAndNamePlatesFiller";
import classNames from 'classnames';
import { getSessionStorage } from '../../../../../servicesAndUtilities/sessionStorageHelper';
import hoverOperator from '../commonLogic/hoverUnhoverCard';
import cardOnMouseHover from '../commonLogic/cardOnMouseHoverSocket';

export default function Round1Cards(
    userNamePlatesArray,
    cardsArray,
    socket,
    { card1, card2, names },
    setGameCards,
    setUserNameCards,
    playersTurnName,
    cardsAndNamesRef) {

    let userData = getSessionStorage();
    names = new Set(names);
    names.delete(userData.name);
    names = [...names]


    for (let i = 0; i < userData.numberOfPlayers; i++) {

        userNamePlatesArray.push(
            <div
                key={i}
                className={classNames(classes.userName, classes[`userName${i + 1}`])}
                cardtype={'namePlate'}
                username={UserTableName({userData, i, names}) }
            >
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
                onMouseEnter={(e) => cardOnMouseHover(e, socket, userData, playersTurnName, true)}
                onMouseLeave={(e) => cardOnMouseHover(e, socket, userData, playersTurnName, false)}
            >

                {<CardText i={i} card1={card1} card2={card2} />}
            </div>);
    }

    userNamePlatesArray.reverse();
    setUserNameCards(userNamePlatesArray)

    cardsArray.reverse();
    setGameCards(cardsArray);

    socket.on('hoverCardForOtherPlayers', ({ name, cardPos, hoverCase }) => hoverOperator(name, cardPos, cardsAndNamesRef, hoverCase));

}