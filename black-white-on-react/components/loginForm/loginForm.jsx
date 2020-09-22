import { useState, useEffect } from 'react';
import Router from 'next/router'
import classes from '../../styles/index.module.scss'
import NameInput from './nameInput.jsx'
import SubmitBTN from './submitBTN';
import InputError from './inputError';
import { objectToURL } from '../encodeDecodeURL/encodeDecodeURL.js'
import connectSocket from '../socket/socket';


export default function LoginForm({ userData }) {

    const [errorText, setErrorText] = useState('');
    const [input, setInput] = useState("");
    const [submitBTNText, setsubmitBTNText] = useState("");


    useEffect(() => {
        if (!userData.roomId) {
            setsubmitBTNText('Начать игру')
        } else {
            setsubmitBTNText('Присоединиться')
        }
    })

    function handleSubmit(e) {
        e.preventDefault();
        let inputValue = e.target.elements[0].value;
        if (inputValue.length < 3) {
            setErrorText('Не менее 3 символов');
            return;
        }
        else {
            setErrorText('');
            userData.name = input;


            if (!userData.roomId) {
                let URLToLeaderPage = `/LeadersChoice/${objectToURL(userData)}`;
                Router.push('/LeadersChoice/[user]', URLToLeaderPage);
            } else {

                let socket = connectSocket();


                setErrorText('Проверяем имя');
                socket.emit('checkNameOnBusy', userData.roomId, userData.name);
                socket.on('checkNameRes', ({ res }) => {
                    if (res) {
                        setErrorText('Имя занято');
                    } else {
                        setErrorText('');
                        let URLToGamePage = `/Game/${objectToURL(userData)}`;
                        Router.push('/Game/[user]', URLToGamePage);
                    }
                })
            }

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
                <SubmitBTN submitBTNText={submitBTNText} />
            </form >
        </>
    )
}