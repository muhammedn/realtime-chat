const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoined , getCurrentUserJoined, getRoomUsers} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


// Setting static folders
app.use(express.static(path.join(__dirname,'public')));

// when user connect
io.on('connection', (socket) => {
    console.log('New web server connection...');

    socket.on('joinRoom', ({username, room}) => {

    const user = userJoined(socket.id, username, room);

    socket.join(user.room);

        
    // When user connect
    socket.emit('message', formatMessage('Chat Bot', 'welcome to the Chat'));

    // Notify users there is new user connected
    socket.broadcast.to(user.room).emit('message', formatMessage('Chat Bot', `${user.username} has joind the chat`));


    // Notify users and room info

    io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
    });

    });



    // Listen for chatMessage event

    socket.on('chatMessage', (msg)=>{

        const user = getCurrentUserJoined(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });


    // Notify users there is a user disconnected

    socket.on('disconnect', ()=>{

        const user = getCurrentUserJoined(socket.id);

        console.log(user);

        if(user){
            io.to(user.room).emit('message', formatMessage('Chat Bot', `${user.username} has left the chat`));

        }


    // Notify users and room info

    io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
    });


    });


});


const PORT = process.env.PORT || 3333;

server.listen(PORT , ()=>{
    console.log(`Server started on port : ${PORT}`);
});