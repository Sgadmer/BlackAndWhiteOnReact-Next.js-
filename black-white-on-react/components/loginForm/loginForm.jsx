import { useState, useEffect } from "react";
import Router from "next/router";
import classes from "../../styles/index.module.scss";
import NameInput from "./nameInput.jsx";
import SubmitBTN from "./submitBTN";
import InputError from "./inputError";
import { useSocket } from "../../servicesAndUtilities/SocketContext";
import { setSessionStorage } from "../../servicesAndUtilities/sessionStorageHelper";

export default function LoginForm({ roomID }) {
  const [errorText, setErrorText] = useState("");
  const [input, setInput] = useState("");
  const [submitBTNText, setsubmitBTNText] = useState("");
  let socket = useSocket();
  let userData = {};

  useEffect(() => {
    if (!roomID) {
      setsubmitBTNText("Начать игру");
    } else {
      setsubmitBTNText("Присоединиться");
    }
  }, [roomID]); //Вариант с [] в  документации считают не очень хорошим, поэтому оставил [userData.roomId]

  function handleSubmit(e) {
    e.preventDefault();
    let inputValue = e.target.elements[0].value;
    if (inputValue.length < 3) {
      setErrorText("Не менее 3 символов");
      return;
    } else {
      setErrorText("");
      userData.name = input;
      userData.roomId = roomID;
      setSessionStorage(userData);

      if (!roomID) {
        Router.push("/LeadersChoice");
      } else {
        setErrorText("Проверяем имя");
        socket.emit("checkNameOnBusy", roomID, userData.name);
        socket.on("checkNameRes", ({ res }) => {
          if (res) {
            setErrorText("Имя занято");
          } else {
            setErrorText("");
            Router.push("/Game");
          }
        });
      }
    }
  }

  function handleChange() {
    setErrorText("");
  }

  return (
    <>
      <form
        className={classes.wrapper}
        onSubmit={(e) => handleSubmit(e)}
        onChange={() => handleChange()}
      >
        <InputError text={errorText} />
        <NameInput input={input} setInput={setInput} />
        <SubmitBTN submitBTNText={submitBTNText} />
      </form>
    </>
  );
}
