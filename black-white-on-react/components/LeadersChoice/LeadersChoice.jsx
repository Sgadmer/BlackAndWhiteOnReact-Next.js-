import classes from "../../styles/choiceCards.module.scss";
import Router from "next/router";
import { getSessionStorage, setSessionStorage } from "../../servicesAndUtilities/sessionStorageHelper";


export default function LeadersChoiceComponent() {

  let userData = getSessionStorage();
  

  function onChoosingLeader(Leader) {
    userData.leader = Leader;
      setSessionStorage(userData);

    Router.push("/NumberOfPlayers");
  }

  return (
    <>
      <div className={classes.wrapper}>
        <h1 className={classes.userName}>{userData.name}, выберите ведущего</h1>

        <div className={classes.wrapperCards}>
          <div className={classes.ChoiceCard}>
            <h1>Ведущий - игрок</h1>
            <small className={classes.dontWorking}>Пока не работает :)</small>
          </div>
          <div
            className={classes.ChoiceCard}
            onClick={() => onChoosingLeader("bot")}
          >
            <h1>Ведущий - бот</h1>
          </div>
        </div>
      </div>
    </>
  );
}
