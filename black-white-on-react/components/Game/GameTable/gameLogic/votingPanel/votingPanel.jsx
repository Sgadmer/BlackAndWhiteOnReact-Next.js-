import { useEffect, useState } from "react";
import { getSessionStorage } from "../../../../../servicesAndUtilities/sessionStorageHelper";
import { useSocket } from "../../../../../servicesAndUtilities/SocketContext";
import classes from "../../../../../styles/votingPanel.module.scss";

export default function VotingPanelComponent({ votingPanelVis }) {
  const [votingVisibility, setVotingVisibility] = useState(false);
  const [votingTables, setVotingTables] = useState([]);
  const socket = useSocket();
  let userData = getSessionStorage();
  useEffect(() => {
    setVotingVisibility(votingPanelVis);
  }, [votingPanelVis]);

  socket.on("createVotingTables", (names) => {
    let votingTablesArray = [];

    for (let i = 0; i < userData.numberOfPlayers; i++) {
      if (names[i] != userData.name) {
        votingTablesArray.push(
          <div
            className={classes.votingTable}
            playersname={names[i]}
            key={i}
            onClick={(e) => {
              socket.emit(
                "playerVoted",
                {
                  userData,
                  playersName: e.currentTarget.getAttribute("playersname")
                }
              );
              setVotingVisibility(false);
            }}
          >
            {names[i]}
          </div>
        );
      }
    }

    setVotingTables(votingTablesArray);
    setVotingVisibility(true);
  });

  return (
    <>
      {votingVisibility && (
        <div className={classes.votingPanel}>
          <div className={classes.voteAlert}>Кто лжёт?</div>
          <div className={classes.votingTableWrapper}>{votingTables}</div>
        </div>
      )}
    </>
  );
}
