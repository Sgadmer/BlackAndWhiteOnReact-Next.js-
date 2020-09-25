import { useEffect, useRef, useState } from "react";
import Round1Cards from "./gameLogic/round1/SetRound1Cards";
import classes from "../../../styles/gameTable.module.scss";
import {
  getSessionStorage,
  setSessionStorage,
} from "../../../servicesAndUtilities/sessionStorageHelper";
import { useSocket } from "../../../servicesAndUtilities/SocketContext";

export default function CardsComponent() {
  const [gameCards, setGameCards] = useState("");
  const [userNamePlates, setUserNameCards] = useState("");
  const [roundAlertion, setRoundAlertion] = useState("");
  const socket = useSocket();
  const cardsRef = useRef(null);

  let userData = getSessionStorage();
  let userNamePlatesArray = [];
  let cardsArray = [];

  useEffect(() => {
    socket.emit("getPlayersInfo", userData);
    socket.on("resPlayersInfo", (res) => {
      userData.numberOfPlayers = res.numberOfPlayers;
      setSessionStorage(userData);
      socket.emit("playerReady", userData);
      socket.on("startRound", (name) => {
        setRoundAlertion(`Раунд 1`);

        setTimeout(() => {
          setRoundAlertion(`Ходит ${name}`);

          setTimeout(() => {
            setRoundAlertion("");
          }, 3000);
        }, 3000);

        Round1Cards(
          userNamePlatesArray,
          cardsArray,
          socket,
          res,
          setGameCards,
          setUserNameCards,
          name,
          cardsRef
        );
      });
    });
  }, []);

  return (
    <>
      {
        roundAlertion != '' &&
        <div className={classes.roundAlertion}>{roundAlertion}</div>
      }

      <div className={classes.cardsWrapper} ref={cardsRef}>
        {userNamePlates}
        {gameCards}
      </div>
    </>
  );
}
