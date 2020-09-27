import { useState } from "react";
import { useCardsInput } from "../../../../../servicesAndUtilities/cardsInputContext";
import classes from "../../../../../styles/gameTable.module.scss";

export default function CardInputComponent() {
  const [input, setInput] = useState("");
  let cardsInput = useCardsInput();

  function inputValidation(e) {
    const digitValidEXP = /\D+/gm;

    let value = e.currentTarget.value;
    value = value.replace(digitValidEXP, "");

    if (Number.isInteger(+value)) {
      if (+value > 99999) {
      } else {
        setInput(value);
      }
    }
  }

  return (
    <>
      <div className={classes.inputMainWrapper}>
        <div className={classes.inputAndBTNSWrapper}>
          <div
            className={classes.inputCloseBTN}
            onClick={cardsInput.toggleCardsInput}
          ></div>
          <input
            className={classes.inputSumm}
            onChange={(e) => inputValidation(e)}
            value={input}
            type="text"
            spellсheck="false"
            placeholder={"Сумма"}
          />
          <div className={classes.inputSubmitBTN}>
            <div className={classes.arrow}/>
          </div>
        </div>
      </div>
    </>
  );
}
