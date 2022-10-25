const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const users = document.getElementById('users');
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


const socket = io();

//Fire event for username and room
socket.emit('joinRoom', {username, room});


// listen to roomUsers Event

socket.on('roomUsers', ({room,users})=>{
    outputRoomName(room);
    outputUsers(users);
});

socket.on('message', (message) =>{
    console.log(message);
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
});


chatForm.addEventListener('submit', (e)=>{

    e.preventDefault();

    let elMsg = e.target.elements.msg

    const msg = elMsg.value;

    // Send message to server
    socket.emit('chatMessage', msg);

    elMsg.value = '';
    elMsg.focus();

});

// Send message from server to front

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>
    `;
    document.querySelector('.chat-messages').appendChild(div);

}


// get room name

function outputRoomName(room){

    roomName.innerText = room;

}


// get room users

function outputUsers(users){

    users.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join()}
    `;

}