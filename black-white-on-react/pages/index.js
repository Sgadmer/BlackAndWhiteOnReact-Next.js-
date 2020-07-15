import Link from 'next/link';
import classes from '../styles/index.module.scss'

export default function AuthorizationPage() {
    return (
        <>
            <form className={classes.wrapper}>
                <input className={classes.nameInput} placeholder='Имя' required />
                <Link href={'/game'}><button className={classes.startGameBTN} type='submit'>Начать игру</button></Link>
            </form>
        </>
    )
}