const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 8080;

const roooms = new Map();

app.get('/', (req, res) => {
    console.log('MainPage');
    res.set('Access-Control-Allow-Origin', '*');
    res.send(`wefwefwefwe`);
});

io.on('connection', socket => {
    console.log(`socket conected: ${socket.id}`);
})

server.listen(port, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Server has been started');
})   

