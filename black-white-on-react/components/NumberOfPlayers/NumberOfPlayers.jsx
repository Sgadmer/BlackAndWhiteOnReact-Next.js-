import classes from "../../styles/choiceCards.module.scss";
import Router from "next/router";
import Loader from "../Game/loader";
import { useState } from "react";
import { getSessionStorage, setSessionStorage } from "../../servicesAndUtilities/sessionStorageHelper";

export default function NumberOfPlayersComponent() {
  const [isNumberChoosen, setisNumberChoosen] = useState(false);
  let userData = getSessionStorage();


  function onChoosingNumber(Number) {
    userData.numberOfPlayers = Number;
      setSessionStorage(userData);

    setisNumberChoosen(true);
    Router.push("/Game");
  }

  if (!isNumberChoosen) {
    return (
      <>
        <div className={classes.wrapper}>
          <h1 className={classes.userName}>
            {userData.name}, выберите количество игроков
          </h1>

          <div className={classes.wrapperCards}>

            <div
              className={classes.ChoiceCard}
              onClick={() => onChoosingNumber(3)}
            >
              <h1>3</h1>
            </div>
            <div
              className={classes.ChoiceCard}
              onClick={() => onChoosingNumber(4)}
            >
              <h1>4</h1>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <Loader loadText={"Подключаемся к серверу"} />;
  }
}
