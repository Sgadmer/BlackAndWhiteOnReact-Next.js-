import classes from "../../../../../styles/gameTable.module.scss";

export default function CardInputComponent() {
  return (
    <div className={classes.inputMainWrapper}>
      <div className={classes.inputAndBTNSWrapper}>
        <div className={classes.inputCloseBTN}></div>
        <input
          className={classes.inputSumm}
          placeholder={"Сумма до 99к"}
        ></input>
      </div>
    </div>
  );
}
