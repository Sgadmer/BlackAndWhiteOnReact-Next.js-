import { useEffect, useRef, useState } from "react";
import Round1Cards from "./gameLogic/round1/SetRound1Cards";
import classes from "../../../styles/gameTable.module.scss";
import {
  getSessionStorage,
  setSessionStorage,
} from "../../../servicesAndUtilities/sessionStorageHelper";
import { useSocket } from "../../../servicesAndUtilities/SocketContext";
import hoverNameOperator from "./gameLogic/commonLogic/hoverUnhoverName";
import CardInputComponent from "./gameLogic/cardsInput/cardInput";
import { useCardsInput } from "../../../servicesAndUtilities/cardsInputContext";
import VotingPanelComponent from "./gameLogic/votingPanel/votingPanel";
import funalSumCardPutter from "./gameLogic/commonLogic/putFinalSumOnCards";
import markLooserNamePlate from "./gameLogic/commonLogic/markLooserNamePlate";
import Router from "next/router";


export default function CardsComponent() {
  const [gameCards, setGameCards] = useState("");
  const [userNamePlates, setUserNameCards] = useState("");
  const [roundAlertion, setRoundAlertion] = useState("");
  const [playersTurnName, setPlayersTurnName] = useState("");
  const [isFirstTurn, setIsFirstTurn] = useState(true);
  const [votingPanelVis, setVotingPanelVis] = useState(false);
  const [isEndOfGame, setIsEndOfGame] = useState(false);
  const socket = useSocket();
  const cardsAndNamesRef = useRef(null);

  let userData = getSessionStorage();
  let userNamePlatesArray = [];
  let cardsArray = [];

  let cardsInput = useCardsInput();

  const handleRoundAlert = (message) => {
    setRoundAlertion(message);
    setTimeout(() => {
      setRoundAlertion("");
    }, 3000);
  };

  useEffect(() => {
    socket.emit("getPlayersInfo", userData);
    socket.on("resPlayersInfo", (res) => {
      userData.numberOfPlayers = res.numberOfPlayers;
      setSessionStorage(userData);
      socket.emit("playerReady", userData);
      socket.on("startRound", (name) => {
        userData.playersTurnName = name;
        setSessionStorage(userData);
        setPlayersTurnName(name);
        setRoundAlertion(`Начинаем игру!`);

        Round1Cards(
          userNamePlatesArray,
          cardsArray,
          socket,
          res,
          setGameCards,
          setUserNameCards,
          cardsAndNamesRef,
          cardsInput
        );

        socket.on("changePlayerTurn", ({ name }) => {
          userData.playersTurnName = name;
          setSessionStorage(userData);
          setPlayersTurnName(name);
        });
      });

      socket.on("noLoserSelected", () => {
        handleRoundAlert(`Проигравший не выбран!`);

        setTimeout(() => {
          setVotingPanelVis(false);
          setVotingPanelVis(true);
        }, 3000);
      });

      socket.on("introduceLooser", ({ looserName, cardsInfo }) => {
        handleRoundAlert(`Проигравший ${looserName}`);
        hoverNameOperator("", cardsAndNamesRef, true);
        markLooserNamePlate(looserName, cardsAndNamesRef);
        setTimeout(() => {
          handleRoundAlert(`Вскрываемся!`);
          setTimeout(() => {
            funalSumCardPutter(cardsAndNamesRef, cardsInfo);
            setTimeout(() => {
              setIsEndOfGame(true);
              setTimeout(() => {
                Router.push("/ThanksForGame");
              }, 9000)
            }, 4000);
          }, 2000);
        }, 3000);
    
      });
    });
  }, []);

  useEffect(() => {
    if (isFirstTurn) {
      setTimeout(() => {
        handleRoundAlert(`Ходит ${playersTurnName}`);
        hoverNameOperator(playersTurnName, cardsAndNamesRef);
        setIsFirstTurn(false);
      }, 3100);
    } else {
      handleRoundAlert(`Ходит ${playersTurnName}`);
      hoverNameOperator(playersTurnName, cardsAndNamesRef);
    }
  }, [playersTurnName]);

  return (
    <>
      {roundAlertion && (
        <div className={classes.roundAlertion}>{roundAlertion}</div>
      )}

      <div className={classes.cardsWrapper} ref={cardsAndNamesRef}>
        {userNamePlates}
        {gameCards}
      </div>

      {cardsInput.visible && <CardInputComponent />}

      <VotingPanelComponent votingPanelVis={votingPanelVis} />

      {isEndOfGame && <div className={classes.blackScreen}></div>}
    </>
  );
}
