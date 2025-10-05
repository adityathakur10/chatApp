const userSockets=new Map();

function addSocket(userId,socketId){
    const key=String(userId);
    if(!userSockets.has(key)){
        userSockets.set(key,new Set());
    }
    userSockets.get(key).add(socketId);
}

function removeSocket(userId,socketId){
    const key=String(userId);
    const set=userSockets.get(key);
    if(!set)return ;
    set.delete(socketId);

    if(set.size===0)userSockets.delete(key);
}

function getSockets(userId){
    const key=String(userId);
    return userSockets.get(key) || new Set();
}


export default{
    addSocket,
    removeSocket,
    getSockets
}