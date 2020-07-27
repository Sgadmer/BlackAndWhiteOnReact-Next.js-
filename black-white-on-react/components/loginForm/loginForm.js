import { useState } from 'react';
import Router from 'next/router'
import classes from '../../styles/index.module.scss'
import NameInput from './nameInput.js'
import SubmitBTN from './submitBTN';
import InputError from './inputError';
import { objectToURL } from '../encodeDecodeURL/encodeDecodeURL.js'


export default function LoginForm() {

    const [errorText, setErrorText] = useState('');
    const [input, setInput] = useState("");



    function handleSubmit(e) {
        e.preventDefault();
        let inputValue = e.target.elements[0].value;
        if (inputValue.length < 3) {
            setErrorText('Не менее 3 символов');
            return;
        }
        else {
            setErrorText('');

            let userData = {
                name: input,
            }

            let URLToLeaderPage = `/LeadersChoice/${objectToURL(userData)}`;
            Router.push('/LeadersChoice/[user]', URLToLeaderPage);
        }
    }

    function handleChange() {
        setErrorText('');
    }

    return (
        <>
            <form className={classes.wrapper} onSubmit={(e) => handleSubmit(e)} onChange={() => handleChange()}>
                <InputError text={errorText} />
                <NameInput input={input} setInput={setInput} />
                <SubmitBTN />
            </form >
        </>
    )
}



    // const axios = require('axios');
    // const router = useRouter();
    // axios.get('https://jsonplaceholder.typicode.com/todos/1')
    //     .then(function (response) {
    //         // handle success
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })

    // useEffect(() => {
    //     setTimeout(() => router.push('/game'), 3000)

    // }, [])


// axios.get(host)
//     .then(response => console.log("response", response.data))



// import Link from 'next/link';
// import axios from 'axios';
// import host from '../portHostData/portHostData'