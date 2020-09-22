import classes from '../../styles/choiceCards.module.scss'
import { objectToURL } from '../encodeDecodeURL/encodeDecodeURL';
import Router from 'next/router';

export default function LeadersChoiceComponent({ userData }) {


    function onChoosingLeader(Leader) {
        userData.leader = Leader;


        let URLToNumberOfPlayersPage = `/NumberOfPlayers/${objectToURL(userData)}`;
        Router.push('/NumberOfPlayers/[user]', URLToNumberOfPlayersPage);


    }

    return (
        <>
            <div className={classes.wrapper}>
                <h1 className={classes.userName}>{userData.name}, выберите ведущего</h1>

                <div className={classes.wrapperCards}>
                    <div
                        className={classes.ChoiceCard}
                    >
                        <h1>Ведущий - игрок</h1>
                        <small className={classes.dontWorking}>Пока не работает :)</small></div>
                    <div className={classes.ChoiceCard} onClick={() => onChoosingLeader('bot')}><h1>Ведущий - бот</h1></div>
                </div>

            </div>
        </>
    )

}

