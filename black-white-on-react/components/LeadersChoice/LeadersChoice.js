import classes from '../../styles/choiceCards.module.scss'
import { objectFromURL, objectToURL } from '../encodeDecodeURL/encodeDecodeURL';
import Router from 'next/router';

export default function LeadersChoiceComponent({ router }) {

    let userData = objectFromURL(router.query.user);



    function onChoosingLeader(Leader) {
        userData.leader = Leader;

        let URLToNumberOfPlayersPage = `/NumberOfPlayers/${objectToURL(userData)}`;
        Router.push('/NumberOfPlayers/[user]', URLToNumberOfPlayersPage);
    }

    return (
        <>
            <div className={classes.wrapper}>
                <h1 className={classes.userName}>{userData.name}, выберите ведущего</h1>

                  <div className={classes.wrapper}></div>
                <div className={classes.ChoiceCard} onClick={() => onChoosingLeader('player')}><h1>Ведущий - игрок</h1></div>
                <div className={classes.ChoiceCard} onClick={() => onChoosingLeader('bot')}><h1>Ведущим - бот</h1></div>


            </div>
        </>
    )
}
