import classes from '../../styles/choiceCards.module.scss';

export default function NumberOfPlayersComponent({ userData }) {

    function onChoosingNumber(Number) {
        userData.numberOfPlayers = Number;

        // let URLToNumberOfPlayersPage = `/NumberOfPlayers/${objectToURL(userData)}`;
        // Router.push('/NumberOfPlayers/[user]', URLToNumberOfPlayersPage);

        console.log(userData);

    }

    return (
        <>
            <div className={classes.wrapper}>
                <h1 className={classes.userName}>{userData.name}, выберите количество игроков</h1>

                <div className={classes.wrapperCards}>
                    <div className={classes.ChoiceCard} onClick={() => onChoosingNumber('2')}><h1>2</h1></div>
                    <div className={classes.ChoiceCard} onClick={() => onChoosingNumber('3')}><h1>3</h1></div>
                    <div className={classes.ChoiceCard} onClick={() => onChoosingNumber('4')}><h1>4</h1></div>
                </div>

            </div>
        </>
    )
}