const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


// Setting static folders
app.use(express.static(path.join(__dirname,'public')));

// when user connect
io.on('connection', (socket) => {
    console.log('New web server connection...');

    // When user connect
    socket.emit('message', 'welcome to the Chat');

    // Notify users there is new user connected
    socket.broadcast.emit('message', 'A user has joind the chat');

    // Notify users there is a user disconnected
    
    socket.on('disconnect', ()=>{
        
        io.emit('message', 'A user has left the chat');
    });


});


const PORT = process.env.PORT || 3000;

server.listen(PORT , ()=>{
    console.log(`Server started on port : ${PORT}`);
});