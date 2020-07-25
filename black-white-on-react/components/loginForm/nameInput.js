import { useState } from 'react';
import InputError from './inputError';
import classes from '../../styles/index.module.scss'

export default function NameInput({input, setInput}) {

    // const [input, setInput] = useState("");
    const [styles, setStyles] = useState([classes.nameInput])
    const [errorText, setErrorText] = useState('');

    function inputValidation(e) {
        let value = e.currentTarget.value;

        const mainValidEXP = /[^a-zA-Zа-яА-Я]/gm;

        (value.length > 10) ? inputIsTooLong() : inputIsOkay();

        function inputIsTooLong() {
            value = value.replace(mainValidEXP, '');
            setStyles(classes.inputErrorRed)
            setErrorText('Не более 10 символов');
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
            <input className={styles} onChange={(e) => inputValidation(e)} value={input} placeholder='Имя' type="text" spellсheck="false" />
            <InputError text={errorText} />
        </>
    )
}