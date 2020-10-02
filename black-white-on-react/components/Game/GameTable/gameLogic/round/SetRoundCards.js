import classes from '../../../../../styles/gameTable.module.scss';
import { UserTableName, setUserName, CardText, setCardPosition } from "../commonLogic/cardsAndNamePlatesFiller";
import classNames from 'classnames';
import { getSessionStorage, setSessionStorage } from '../../../../../servicesAndUtilities/sessionStorageHelper';
import hoverOperator from '../commonLogic/hoverUnhoverCard';
import cardOnMouseHover from '../commonLogic/cardOnMouseHoverSocket';
import playedCardMarker from '../commonLogic/markPlayedCard';
import sumCardPutter from '../commonLogic/putSummOnCard';

//Генерирует карты и таблички имен
export default function RoundCards(

    userNamePlatesArray,
    cardsArray,
    socket,
    { card1, card2, names },
    setGameCards,
    setUserNameCards,
    cardsAndNamesRef,
    cardsInput) {

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
                username={UserTableName({ userData, i, names })}
            >
                {<UserTableName userData={userData} i={i} names={names} />}

            </div>
        );
    }

    const changeCardsInputVisible = (e) => {
        e.persist();
        let userData = getSessionStorage();

        if (userData.name == userData.playersTurnName

        ) {
            cardsInput.toggleCardsInput();
            let selectedCard = e.currentTarget;
            userData.selectedCardPos = selectedCard.getAttribute('cardposition');
            setSessionStorage(userData);
        }



    };

    for (let i = 0; i < userData.numberOfPlayers * 2; i++) {

        cardsArray.push(
            <div username={setUserName(userData, i, names)}
                cardposition={setCardPosition(i)}
                key={i}
                className={classNames(classes.card, classes[`card${i + 1}`])}
                onMouseEnter={(e) => cardOnMouseHover(e, socket, userData, true)}
                onMouseLeave={(e) => cardOnMouseHover(e, socket, userData, false)}
                onClick={i < 2 ? (e) => changeCardsInputVisible(e) : undefined}
            >

                {< CardText i={i} card1={card1} card2={card2} />}
            </div >);
    }

    userNamePlatesArray.reverse();
    setUserNameCards(userNamePlatesArray)

    cardsArray.reverse();
    setGameCards(cardsArray);

    socket.on('hoverCardForOtherPlayers', ({ name, cardPos, hoverCase }) => hoverOperator(name, cardPos, cardsAndNamesRef, hoverCase));
    socket.on('markPlayedCardForCurrentPlayer', (summ) => playedCardMarker(cardsAndNamesRef, summ));
    socket.on('putSummOnCard', ({ usData, summ }) => sumCardPutter(cardsAndNamesRef, usData, summ))
}