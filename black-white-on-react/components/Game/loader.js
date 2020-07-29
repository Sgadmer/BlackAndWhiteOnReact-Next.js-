import classes from '../../styles/loader.module.scss'

export default function Loader({ loadText }) {
    return (
        <>
            <div className={classes.loader}></div>
            <h1 className={classes.loadText}>{loadText}</h1>
        </>
    )
}