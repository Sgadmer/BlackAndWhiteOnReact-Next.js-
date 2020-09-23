import io from 'socket.io-client';

function connectSocket() {
    return io('http://localhost:8080');
}


export default connectSocket;