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
const directMessagesList = document.getElementById('directMessages');

addUserButton.addEventListener('click', () => userModal.style.display = 'block');
addChannelButton.addEventListener('click', () => channelModal.style.display = 'block');

closeUserModal.addEventListener('click', () => closeModal(userModal, searchUserInput, userSearchResults));
closeChannelModal.addEventListener('click', () => closeModal(channelModal, searchChannelInput, channelSearchResults));

function closeModal(modal, inputField, resultContainer) {
    modal.style.display = 'none';
    inputField.value = '';
    resultContainer.innerHTML = '';
}

async function fetchAddedUsers() {
    try {
        const response = await fetch('http://localhost:3000/chatApp/chat/fetchAddedUsers',{
            method:'POST'
        });
        // console.log('tttttt')
        // console.log(response.json)
        if (response.ok) {
            const users = await response.json();
            // console.log(users)
            users.forEach(user => addUserToChatList(user));
        }
    } catch (error) {
        console.error('Error fetching added users:', error);
    }
}

function addUserToChatList(username) {
    if ([...directMessagesList.children].some(user => user.dataset.username === username)) return;
    
    const userElement = document.createElement('li');
    console.log(username);
    userElement.dataset.username = username;
    userElement.textContent = username;

    const removeButton = document.createElement('button');
    removeButton.textContent = '❌';
    removeButton.addEventListener('click', () => removeUser(username));

    userElement.appendChild(removeButton);
    userElement.addEventListener('click', () => selectChatUser(username));
    directMessagesList.appendChild(userElement);
}

async function removeUser(username) {
    try {
        const response = await fetch('http://localhost:3000/chatApp/chat/removeUser', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {username }),
        });

        if (response.ok) {
            const userElement = directMessagesList.querySelector(`li[data-username="${username}"]`);
            if (userElement) directMessagesList.removeChild(userElement);
            alert(`${username} has been removed.`);
        } else {
            alert('Failed to remove user.');
        }
    } catch (error) {
        console.error('Error removing user:', error);
    }
}

searchUserButton.addEventListener('click', async () => {
    const query = searchUserInput.value.trim();
    if (!query) return;
    
    const response = await fetch('http://localhost:3000/chatApp/chat/searchUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: query }),
    });
    
    userSearchResults.innerHTML = '';
    if (response.ok) {
        const users = await response.json();
        users.forEach(user => {

            const userItem = document.createElement('li');
            userItem.textContent = user.username;
           
            userItem.addEventListener('click', () => addUser(user));
            userSearchResults.appendChild(userItem);
        });

        
    } else {
        userSearchResults.innerHTML = '<li>User not found!</li>';
    }
});

async function addUser(user) {
    const response = await fetch('http://localhost:3000/chatApp/chat/addUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( user ),
    });
    const res=await response.json()
    console.log(res)
    if (response.ok) {
        addUserToChatList(user.username);
        alert('User added successfully!');
        userModal.style.display = 'none';
        searchUserInput.value = '';
    } else {
        alert(res.message);
    }
}

let activeChatUser = null;
async function selectChatUser(username) {
    activeChatUser = username;
    document.getElementById('chatHeader').textContent = `Chat with ${username}`;
    document.getElementById('messages').innerHTML = '';

    try {
        const response = await fetch('http://localhost:3000/chatApp/chat/fetchMessages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to: username }),
        });
        const messages = await response.json();

        messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.textContent = `${msg.from}: ${msg.content}`;
            document.getElementById('messages').appendChild(messageElement);
        });
    } catch (error) {
        console.error('Error fetching chat history:', error);
    }
}

document.getElementById('sendMessage').addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (!activeChatUser || !message) return alert('Please select a user and enter a message!');

    socket.emit('sendMessage', { to: activeChatUser, message });
    
    const messageElement = document.createElement('div');
    messageElement.textContent = `You: ${message}`;
    document.getElementById('messages').appendChild(messageElement);
    
    messageInput.value = '';
});

socket.on('receiveMessage', (data) => {
    if (activeChatUser !== data.from) return;

    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.from}: ${data.content}`;
    document.getElementById('messages').appendChild(messageElement);
});

fetchAddedUsers();




// channels

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
