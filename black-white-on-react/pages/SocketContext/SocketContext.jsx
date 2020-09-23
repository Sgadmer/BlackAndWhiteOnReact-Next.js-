import { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';




const SocketContext = React.createContext();

export const UseSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState('');

    useEffect(()=>{
        setSocket(io('http://localhost:8080'));
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}