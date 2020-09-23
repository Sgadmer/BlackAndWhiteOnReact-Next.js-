import Loader from "./loader";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import createURLforOtherPlayers from "./createURLForOtherPlayers";
import GameTableComponent from "./GameTable/GameTable";
import Router from 'next/router'
import { UseSocket } from "../../pages/SocketContext/SocketContext";

export default function GameComponent({ userData }) {
    const router = useRouter();

    console.log(userData);

    const [isReadyToGame, setisReadyToGame] = useState(false);
    const [loadText, setLoadText] = useState("Подключаемся к серверу");
    const [URLforOtherPlayers, setURLforOtherPlayers] = useState("");
    const [URLcopyBTNText, setcopyBTNText] = useState("");
    const [socket, setSocket] = useState(UseSocket());

    useEffect(() => {

        if (!userData.roomId) {
            socket.on('socketConnected', () => {
                setLoadText('Создаём комнату')

                socket.emit('createRoom', userData);
            });

            socket.on('roomCreated', () => {
                userData.roomId = socket.id;
                socket.emit('joinRoom', userData);
            });
        } else {
            setLoadText('Подключаемся к комнате')
            socket.emit('joinRoom', userData);
        }


        socket.on('userJoin_UserLeave', ({ actualNumberOfPlayers, numberOfPlayers }) => {
            setLoadText(`Игроков в комнате ${actualNumberOfPlayers} / ${numberOfPlayers}`)
            let playersURL = createURLforOtherPlayers(userData);
            if (actualNumberOfPlayers == 1) {
                setURLforOtherPlayers(playersURL)
                setcopyBTNText('Скопировать ссылку')
            }

            if (actualNumberOfPlayers == numberOfPlayers) {
                setLoadText('Начинаем игру!')

                // setTimeout(() => {
                    setisReadyToGame(true)
                // }, 1500)
            }
        })



        socket.on('roomOverfill', () => {
            let localCount = 10;
            let pushTimer = setInterval(() => {
                localCount--;
                setLoadText(`Комната переполненна, на главную через ${localCount}`)

                if (localCount == 0) {
                    clearInterval(pushTimer)
                    Router.push('/');
                }
            }, 1000);
        })

    }, []);



    if (!isReadyToGame) {
        return (
           
                <Loader loadText={loadText} URLforOtherPlayers={URLforOtherPlayers} URLcopyBTNText={URLcopyBTNText} />
          
        )
    } else {
        return (
           
                <GameTableComponent userData={userData} socket={socket} />
           
        )
    }

}