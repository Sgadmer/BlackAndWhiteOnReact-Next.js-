import { useEffect, useState } from "react";
import {
  getSessionStorage,
  setSessionStorage,
} from "../../servicesAndUtilities/sessionStorageHelper";
import classes from "../../styles/thanksForTheGame.module.scss";
import Router from "next/router";
import { useSocket } from "../../servicesAndUtilities/SocketContext";

export default function ThanksForGameComponent() {
  let userData = getSessionStorage();
  const socket = useSocket();
  const [gratitudeText, setGratitudeText] = useState("");
  const [textPattern, setTextPattern] = useState(
    userData.name
      ? `${userData.name}, спасибо за игру!`
      : `Cпасибо вам за игру!`
  );

  useEffect(() => {
    let initialLength = textPattern.length;
    let lastLength = 2;
    setInterval(() => {
      if (initialLength >= lastLength) {
        let copiedPattern = textPattern.slice(0, lastLength);
        setGratitudeText(gratitudeText + copiedPattern);
        setTextPattern(textPattern.slice(lastLength));
        lastLength++;
      } else {
        setTimeout(() => {
          userData;
          setSessionStorage("");
          socket.emit("disconnect");
          Router.push("/");
        }, 3000);
      }
    }, 300);
  }, []);

  return <div className={classes.gratitudeText}>{gratitudeText}</div>;
}
