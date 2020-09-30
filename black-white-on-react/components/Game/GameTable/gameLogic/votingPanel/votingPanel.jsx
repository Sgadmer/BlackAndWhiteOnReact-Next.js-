import { useState } from "react";
import { useSocket } from "../../../../../servicesAndUtilities/SocketContext";
import classes from "../../../../../styles/votingPanel.module.scss";

export default function VotingPanelComponent() {
  const [votingVisibility, setVotingVisibility] = useState(true);
  const [votingTables, setVotingTables] = useState("");
  const socket = useSocket();

  socket.on("createVotingTables", ({ names }) => {
    let vitingTablesArray = [];

    for (let name of names) {
      vitingTablesArray.push(
        <div
          className={classes.votingTable}
          onClick={(name) => {
            socket.emit("addVoteAtVotingArray", name);
            setVotingVisibility(false);
          }}
        ></div>
      );
    }

    setVotingTables(votingTables);
    setVotingVisibility(true);
  });

  if (votingVisibility) {
    return (
      <div className={classes.votingPanel}>
        {/* {votingTables} */}
        <div
          className={classes.votingTable}
          onClick={(name = "name") => {
            alert(name);
            setVotingVisibility(false);
          }}
        >
          "name"
        </div>

        <div
          className={classes.votingTable}
          onClick={(name = "name") => {
            alert(name);
            setVotingVisibility(false);
          }}
        >
          "name"
        </div>

        <div
          className={classes.votingTable}
          onClick={(name = "name") => {
            alert(name);
            setVotingVisibility(false);
          }}
        >
          "name"
        </div>

        <div
          className={classes.votingTable}
          onClick={(name = "name") => {
            alert(name);
            setVotingVisibility(false);
          }}
        >
          "name"
        </div>
      </div>
    );
  }
}
