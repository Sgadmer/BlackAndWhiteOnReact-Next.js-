import Loader from "./loader";
import { useState, useEffect } from 'react';
import connectSocket from "../socket/socket";
import { useRouter } from 'next/router';
import createURLforOtherPlayers from "./createURLForOtherPlayers";

export default function GameComponent({ userData }) {
    const router = useRouter()

    console.log(userData);

    const [loadText, setLoadText] = useState("Подключаемся к серверу");
    const [URLforOtherPlayers, setURLforOtherPlayers] = useState("");
    const [URLcopyBTNText, setcopyBTNText] = useState("");
    const [count, setCount] = useState(10);
    let socket;

    useEffect(() => {

        socket = connectSocket();

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


        socket.on('roomJoined', ({ actualNumberOfPlayers, numberOfPlayers }) => {
            setLoadText(`Игроков в комнате ${actualNumberOfPlayers} / ${numberOfPlayers}`)
            let playersURL = createURLforOtherPlayers(userData);
            setURLforOtherPlayers(playersURL)
            setcopyBTNText('Скопировать ссылку')

        })


        socket.on('roomOverfill', () => {
            setInterval(() => {
                () => setCount(count - 1);
                setLoadText(`Комната переполненна, на главную через ${count}`)

            }, 1000);
        })

    }, []);



    return (
        <>
            <Loader loadText={loadText} URLforOtherPlayers={URLforOtherPlayers} URLcopyBTNText={URLcopyBTNText} />
        </>
    )
}