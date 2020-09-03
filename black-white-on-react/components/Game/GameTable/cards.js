import { useEffect, useState } from "react";
import classes from '../../../styles/gameTable.module.scss';
import classNames from 'classnames';

export default function CardsComponent({ userData, socket }) {

    const [gameCards, setGameCards] = useState('');
    const [userNameCards, setUserNameCards] = useState('')

    useEffect(() => {
        socket.emit('getPlayersInfo', userData)

        socket.on('resPlayersInfo', ({ card1, card2, names }) => {

            names = new Set(names);
            names.delete(userData.name);
            names = [...names]
            let cardsArray = [];
            for (let i = 0; i < userData.numberOfPlayers * 2; i++) {

                function setUserName() {
                    switch (i) {
                        case 0:
                        case 1:
                            return userData.name;
                        case 2:
                        case 3:
                            return names[0];
                        case 4:
                        case 5:
                            return names[1];
                        case 6:
                        case 7:
                            return names[2];
                        default:
                            return '';
                    }
                }

                function CardText() {
                    let text =
                        (i == 0) ? card1 :
                            (i == 1) ? card2 : ''

                    return text;
                }

                function setCardPosition() {

                    return ((i + 1) % 2 == 0) ? 2 : 1
                }

                cardsArray.push(<div username={setUserName()} cardposition={setCardPosition()} key={i} className={classNames(classes.card, classes[`card${i + 1}`])}>{<CardText />}</div>);

            }


            console.log(names);

            cardsArray.reverse();
            setGameCards(cardsArray)


        })

    }, [])

    return (
        <>
            <div className={classes.cardsWrapper}>
                {gameCards}
                <div className={classNames(classes.userName, classes.userName1)}>{userData.name}</div>
                <div className={classNames(classes.userName, classes.userName2)}>{userData.name}</div>
                <div className={classNames(classes.userName, classes.userName3)}>{userData.name}</div>
                <div className={classNames(classes.userName, classes.userName4)}>{userData.name}</div>
            </div>
        </>
    )

}