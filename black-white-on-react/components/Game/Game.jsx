import Loader from "./loader";
import { useState, useEffect } from "react";
import createURLforOtherPlayers from "../../servicesAndUtilities/createURLForOtherPlayers";
import GameTableComponent from "./GameTable/GameTable";
import Router from "next/router";
import { useSocket } from "../../servicesAndUtilities/SocketContext";
import {
  getSessionStorage,
  setSessionStorage,
} from "../../servicesAndUtilities/sessionStorageHelper";
import createMD5 from "../../servicesAndUtilities/createMD5";

export default function GameComponent() {
  const [isReadyToGame, setisReadyToGame] = useState(false);
  const [loadText, setLoadText] = useState("Подключаемся к серверу");
  const [URLforOtherPlayers, setURLforOtherPlayers] = useState("");
  const [URLcopyBTNText, setcopyBTNText] = useState("");
  const socket = useSocket();
  let userData = getSessionStorage();

  useEffect(() => {

    const roomIdMD5 = createMD5(socket);
    if (!userData.roomId) {
      setLoadText("Создаём комнату");
      socket.emit("createRoom", userData, roomIdMD5);

      socket.on("roomCreated", () => {
        if (!userData.roomId) {
          userData.roomId = roomIdMD5;
          setSessionStorage(userData);
        }

        socket.emit("joinRoom", userData);
      });
    } else {
      setLoadText("Подключаемся к комнате");
      socket.emit("joinRoom", userData);
    }

    socket.on(
      "userJoin_UserLeave",
      ({ actualNumberOfPlayers, numberOfPlayers }) => {
        setLoadText(
          `Игроков в комнате ${actualNumberOfPlayers} / ${numberOfPlayers}`
        );
        let playersURL = createURLforOtherPlayers(roomIdMD5);
        if (actualNumberOfPlayers == 1) {
          setURLforOtherPlayers(playersURL);
          setcopyBTNText("Скопировать ссылку");
        }

        if (actualNumberOfPlayers == numberOfPlayers) {
          setisReadyToGame(true);
        }
      }
    );

    socket.on("roomOverfill", () => {
      let localCount = 10;
      let pushTimer = setInterval(() => {
        localCount--;
        setLoadText(`Комната переполненна, на главную через ${localCount}`);

        if (localCount == 0) {
          clearInterval(pushTimer);
          Router.push("/");
        }
      }, 1000);
    });
  }, []);

  if (!isReadyToGame) {
    return (
      <Loader
        loadText={loadText}
        URLforOtherPlayers={URLforOtherPlayers}
        URLcopyBTNText={URLcopyBTNText}
      />
    );
  } else {
    return <GameTableComponent />;
  }
}
