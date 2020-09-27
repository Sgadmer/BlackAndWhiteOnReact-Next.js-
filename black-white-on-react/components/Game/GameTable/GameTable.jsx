import { CardsInputProvider } from "../../../servicesAndUtilities/cardsInputContext";
import classes from "../../../styles/gameTable.module.scss";
import CardsComponent from "./cardsMain";

export default function GameTableComponent() {
  return (
    <CardsInputProvider>
      <div className={classes.backGround}></div>
      <CardsComponent />
    </CardsInputProvider>
  );
}
