import classes from '../../../styles/gameTable.module.scss'
import CardsComponent from './cards'

export default function GameTableComponent({ userData, socket }) {



    return (
        <>
            <div className={classes.backGround}></div>
            <CardsComponent userData={userData} socket={socket}/>
        </>
    )
}