import classes from '../../../styles/gameTable.module.scss'
import CardsComponent from './cardsMain'

export default function GameTableComponent() {



    return (
        <>
            <div className={classes.backGround}></div>
            <CardsComponent/>
        </>
    )
}