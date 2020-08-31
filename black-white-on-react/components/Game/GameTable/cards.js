import { useEffect, useState } from "react";
import classes from '../../../styles/gameTable.module.scss';
import classNames from 'classnames';

export default function CardsComponent({ userData, socket }) {

    const [gameCards, setGameCards] = useState('')

    useEffect(() => {
        socket.emit('getPlayersCardsValue', userData)

        socket.on('resPlayersCardsValue', ({ card1, card2 }) => {


            let cardsArray = [];
            for (let i = 0; i < userData.numberOfPlayers * 2; i++) {

                function CardText() {
                    let text =
                        (i == 0) ? card1 :
                            (i == 1) ? card2 : ''

                    return text;
                }

                cardsArray.push(<div key={i} className={classNames(classes.card, classes[`card${i + 1}`])}>{<CardText />}</div>);

            }

            cardsArray.reverse();
            setGameCards(cardsArray)

        })

    }, [])

    return (
        <>
            <div className={classes.cardsWrapper}>
                {gameCards}
            </div>
        </>
    )

}