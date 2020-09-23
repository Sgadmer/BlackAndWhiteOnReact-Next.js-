import classes from '../../styles/choiceCards.module.scss';
import { objectToURL } from '../encodeDecodeURL/encodeDecodeURL';
import Router from 'next/router';
import Loader from '../Game/loader';
import { useState } from 'react';

export default function NumberOfPlayersComponent({ userData }) {

    const [isNumberChoosen, setisNumberChoosen] = useState(false);


    function onChoosingNumber(Number) {
        userData.numberOfPlayers = Number;

        setisNumberChoosen(true);
        let URLToGamePage = `/Game/${objectToURL(userData)}`;
        Router.push('/Game/[user]', URLToGamePage);
    }



    if (!isNumberChoosen) {
        return (
            <>
                <div className={classes.wrapper}>
                    <h1 className={classes.userName}>{userData.name}, выберите количество игроков</h1>

                    <div className={classes.wrapperCards}>
                        <div className={classes.ChoiceCard} onClick={() => onChoosingNumber(2)}><h1>2</h1></div>
                        <div className={classes.ChoiceCard} onClick={() => onChoosingNumber(3)}><h1>3</h1></div>
                        <div className={classes.ChoiceCard} onClick={() => onChoosingNumber(4)}><h1>4</h1></div>
                    </div>

                </div>
            </>
        )
    } else {
        return (


            <Loader loadText={'Подключаемся к серверу'} />


        )
    }
}