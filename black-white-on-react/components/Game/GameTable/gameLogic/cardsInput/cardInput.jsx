import { useState } from "react";
import { useCardsInput } from "../../../../../servicesAndUtilities/cardsInputContext";
import { getSessionStorage } from "../../../../../servicesAndUtilities/sessionStorageHelper";
import { useSocket } from "../../../../../servicesAndUtilities/SocketContext";
import classes from "../../../../../styles/gameTable.module.scss";

export default function CardInputComponent() {
  const [summ, setSumm] = useState("");
  let cardsInput = useCardsInput();
  let userData = getSessionStorage();
  const socket = useSocket();

  function summInputValidation(e) {
    const digitValidEXP = /\D+/gm;

    let value = e.currentTarget.value;
    value = value.replace(digitValidEXP, "");

    if (Number.isInteger(+value)) {
      if (+value > 0 && +value < 100000) {
        setSumm(value);
      }
    }
  }

  function submitSumm() {
    if (summ) {
      let summCopy = summ;
      summCopy = +summCopy;

      if (Number.isInteger(summCopy) && summCopy > 0 && summCopy < 100000) {
        socket.emit("playerChoosedSumm", { userData, summ: summCopy });
        setSumm("");
        handleClose();
      }
    }
  }

  function handleClose() {
    cardsInput.toggleCardsInput();
  }

  return (
    <>
      <div className={classes.inputMainWrapper}>
        <div className={classes.inputAndBTNSWrapper}>
          <div
            className={classes.inputCloseBTN}
            onClick={() => handleClose()}
          ></div>
          <input
            className={classes.inputSumm}
            onChange={(e) => summInputValidation(e)}
            value={summ}
            type="text"
            spellсheck="false"
            placeholder={"Сумма"}
          />
          <div className={classes.inputSubmitBTN} onClick={() => submitSumm()}>
            <div className={classes.arrow} />
          </div>
        </div>
      </div>
    </>
  );
}
