import { useEffect, useState } from "react";
import Round1Cards from "./gameLogic/SetRound1Cards";
import classes from '../../../styles/gameTable.module.scss';

export default function CardsComponent({ userData, socket }) {

    const [gameCards, setGameCards] = useState('');
    const [userNamePlates, setUserNameCards] = useState('');
    const [playersTurnName, setPlayersTurnName] = useState('')


    let userNamePlatesArray = [];
    let cardsArray = [];

    useEffect(() => {
        socket.emit('getPlayersInfo', userData)
        socket.on('resPlayersInfo', (res) => {

            socket.emit('playerReady', userData);
            socket.on('startRound', (name) => {
                setPlayersTurnName(name);
                alert(`Сейчас ходит ${name}`);
                Round1Cards(userNamePlatesArray, cardsArray, socket,
                    res, userData, setGameCards, setUserNameCards, name);
            });
        })

    }, [])

    return (
        <>
            <div className={classes.cardsWrapper}>
                {userNamePlates}
                {gameCards}
            </div>
        </>
    )

}