import { useEffect, useState } from "react";
import Round1Cards from "./gameLogic/SetRound1Cards";
import classes from "../../../styles/gameTable.module.scss";
import { getSessionStorage, setSessionStorage } from "../../../servicesAndUtilities/sessionStorageHelper";
import { useSocket } from "../../../servicesAndUtilities/SocketContext";

export default function CardsComponent() {
  const [gameCards, setGameCards] = useState("");
  const [userNamePlates, setUserNameCards] = useState("");
  const [playersTurnName, setPlayersTurnName] = useState("");
  const socket = useSocket();

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
        setPlayersTurnName(name);
        alert(`Сейчас ходит ${name}`);
        Round1Cards(
          userNamePlatesArray,
          cardsArray,
          socket,
          res,
          setGameCards,
          setUserNameCards,
          name
        );
      });
    });
  }, []);

  return (
    <>
      <div className={classes.cardsWrapper}>
        {userNamePlates}
        {gameCards}
      </div>
    </>
  );
}
