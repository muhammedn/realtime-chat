const users = [];

// add user
function userJoined(id, username, room){

    const user = {id, username, room};

    users.push(user);

    return user;
};

// get user

function getCurrentUserJoined(id){

    return users.find(user => user.id === id);
};



// get room users

function getRoomUsers(room){

    return users.filter(user => user.room == room)

}


module.exports = {userJoined , getCurrentUserJoined, getRoomUsers};