import { useState } from 'react';
import InputError from './inputError';
import classes from '../../styles/index.module.scss'

export default function NameInput({input, setInput}) {

    const [styles, setStyles] = useState([classes.nameInput])
    const [errorText, setErrorText] = useState('');

    function inputValidation(e) {
        let value = e.currentTarget.value;

        const mainValidEXP = /[^a-zA-Z]/gm;

        (value.length > 7) ? inputIsTooLong() : inputIsOkay();

        function inputIsTooLong() {
            value = value.replace(mainValidEXP, '');
            setStyles(classes.inputErrorRed)
            setErrorText('Не более 7 символов');
        }

        function inputIsOkay() {
            value = value.replace(mainValidEXP, '');
            setStyles(classes.nameInput);
            setInput(value);
            setErrorText('');
        }


    }

    return (
        <>
            <input className={styles} onChange={(e) => inputValidation(e)} value={input} placeholder='Имя (на англ)' type="text" spellсheck="false" />
            <InputError text={errorText} />
        </>
    )
}