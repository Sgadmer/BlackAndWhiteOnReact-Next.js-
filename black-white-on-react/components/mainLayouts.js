import Link from "next/Link";
import classes from '../components/mainLayouts.module.scss'

export function MainLayout({ children }) {
    return (
        <>
            <nav>
                <Link href='/'><a className={classes.buttons}>Home</a></Link> <br></br>
                <Link href='/about' ><a className={classes.buttons}>About</a></Link><br></br>
                <Link href='/posts'><a className={classes.buttons}>Posts</a></Link><br></br>
            </nav>

            <main>
                {children}
            </main>

        </>
    )
} 