const addUserButton = document.getElementById('addUser');
const addChannelButton = document.getElementById('addChannel');

const userModal = document.getElementById('userModal');
const channelModal = document.getElementById('channelModal');
const closeUserModal = document.getElementById('closeUserModal');
const closeChannelModal = document.getElementById('closeChannelModal');

const searchUserInput = document.getElementById('searchUserInput');
const searchChannelInput = document.getElementById('searchChannelInput');
const searchUserButton = document.getElementById('searchUserButton');
const searchChannelButton = document.getElementById('searchChannelButton');

const userSearchResults = document.getElementById('userSearchResults');
const channelSearchResults = document.getElementById('channelSearchResults');

// Open the "Add User" modal
addUserButton.addEventListener('click', () => {
    userModal.style.display = 'block';
});

// Open the "Add Channel" modal
addChannelButton.addEventListener('click', () => {
    channelModal.style.display = 'block';
});

// Close modals
closeUserModal.addEventListener('click', () => {
    userModal.style.display = 'none';
    searchUserInput.value = '';
    userSearchResults.innerHTML = '';
});

closeChannelModal.addEventListener('click', () => {
    channelModal.style.display = 'none';
    searchChannelInput.value = '';
    channelSearchResults.innerHTML = '';
});

//      function to get token 
// function getcookie(name){
//     const cookies=document.cookie.split('; ');
//     for(const cookie of cookies){
//         const [key,value]=cookie.split('=');
//         if(key===name)return value
//     }
//     return null;
// }
// const token=getcookie('token')


let activeChatUser=null;
function direct_msg_event(userElement,username){
    userElement.addEventListener('click',()=>{
        activeChatUser=username;
        const chatHeader=document.getElementById('chatHeader');
        chatHeader.textContent=`chat with ${username}`;
        console.log(`chat with ${username}`);
    })
}
//search for user
searchUserButton.addEventListener('click', async () => {
    console.log('Button clicked'); 
    const query = searchUserInput.value.trim();
    if (!query) return;
    const response = await fetch('http://localhost:3000/chatApp/chat/addUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: query }),
    });

    userSearchResults.innerHTML = '';
    if (response.ok) {
        const { username } = await response.json();
        const resultItem = document.createElement('li');
        resultItem.textContent = username;
        resultItem.addEventListener('click', () => {
            const userElement = document.createElement('li');
            userElement.textContent = username;
            document.getElementById('directMessages').appendChild(userElement);
            userModal.style.display = 'none';

            direct_msg_event(userElement,username);
        });
        userSearchResults.appendChild(resultItem);
    } else {
        const errorItem = document.createElement('li');
        errorItem.textContent = 'User not found!';
        userSearchResults.appendChild(errorItem);
    }
});

//message is sent 
const sendMessageButton=document.getElementById('sendMessage')
sendMessageButton.addEventListener('click',()=>{
    const messageInput=document.getElementById('messageInput');
    const message=messageInput.value.trim();

    if(!activeChatUser){
        alert('please select a user!!!')
        return ;
    }
    if(!message){
        alert('please enter a message!!!')
        return ;
    }
    socket.emit('sendMessage', { to: activeChatUser, message });
console.log('message not got baack')
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `You: ${message}`;
    messagesContainer.appendChild(messageElement);

    messageInput.value = '';
})
//received msg is saved 
socket.on('receiveMessage', (data) => {
    console.log(typeof(data.content))
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.from}: ${data.content}`;
    messagesContainer.appendChild(messageElement);
});





// Search for channels
searchChannelButton.addEventListener('click', async () => {
    const query = searchChannelInput.value.trim();
    if (!query) return;

    // Assuming `/create-group` endpoint supports searching by group name
    const response = await fetch('/create-group', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupName: query, members: [] }),
    });

    channelSearchResults.innerHTML = '';
    if (response.ok) {
        const { group } = await response.json();
        const resultItem = document.createElement('li');
        resultItem.textContent = group.name;
        resultItem.addEventListener('click', () => {
            const channelElement = document.createElement('li');
            channelElement.textContent = `# ${group.name}`;
            document.getElementById('channels').appendChild(channelElement);
            channelModal.style.display = 'none';
        });
        channelSearchResults.appendChild(resultItem);
    } else {
        const errorItem = document.createElement('li');
        errorItem.textContent = 'Channel not found!';
        channelSearchResults.appendChild(errorItem);
    }
});
