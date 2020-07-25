import classes from '../../styles/index.module.scss';

export default function InputError(props) {

    return (
        <>
            {
                props.text ?
                    <h1 className={classes.inputErrorAlert}>{props.text}</h1> :
                    null
            }

        </>
    )
}
