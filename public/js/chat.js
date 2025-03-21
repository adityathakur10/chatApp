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
        const response = await fetch('http://localhost:3000/chatApp/chat/fetchAddedUsers', {
            method: 'POST'
        });
        if (response.ok) {
            const users = await response.json();
            users.forEach(user => addUserToChatList(user));
        }
    } catch (error) {
        console.error('Error fetching added users:', error);
    }
}

function addUserToChatList(username) {
    if ([...directMessagesList.children].some(user => user.dataset.username === username)) return;

    const userElement = document.createElement('li');
    userElement.dataset.username = username;
    // Use flex layout to space the username and remove button.
    userElement.style.display = 'flex';
    userElement.style.justifyContent = 'space-between';
    userElement.style.alignItems = 'center';
    
    // Create a span for the username.
    const nameSpan = document.createElement('span');
    nameSpan.textContent = username;
    
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    // Use a simpler, subtle cross symbol
    removeButton.textContent = '×'; // substitute for the red cross
    // Prevent click on remove from triggering selectChatUser.
    removeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        removeUser(username);
    });
    
    userElement.appendChild(nameSpan);
    userElement.appendChild(removeButton);
    userElement.addEventListener('click', () => selectChatUser(username));
    directMessagesList.appendChild(userElement);
}

async function removeUser(username) {
    try {
        const response = await fetch('http://localhost:3000/chatApp/chat/removeUser', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });
        if (!response.ok) throw new Error((await response.json()).message || 'Failed to remove user');
        
        const userElement = directMessagesList.querySelector(`li[data-username="${username}"]`);
        if (userElement) directMessagesList.removeChild(userElement);
        
        alert(`${username} has been removed.`);
        
        // If the removed chat is actively displayed, clear chat and show overlay.
        if (activeChatUser === username) {
            document.getElementById('messages').innerHTML = '';
            document.getElementById('chatHeader').textContent = 'Select a user to chat';
            activeChatUser = null;
            showChatOverlay();
        }
    } catch (error) {
        console.error("removeUser error:", error);
        alert(error.message);
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
        body: JSON.stringify(user),
    });
    const res = await response.json();
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
    
    // Remove the overlay when a chat is active
    hideChatOverlay();

    try {
        const response = await fetch('http://localhost:3000/chatApp/chat/fetchMessages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to: username }),
        });
        const messages = await response.json();
        const loggedInUsername = localStorage.getItem('username');

        messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.textContent = `${msg.content}`;
            messageElement.classList.add(
                msg.from === loggedInUsername ? 'sent' : 'received'
            );
            document.getElementById('messages').appendChild(messageElement);
        });
    } catch (error) {
        console.error('Error fetching chat history:', error);
    }
}

document.getElementById('sendMessage').addEventListener('click', sendMessage);

document.getElementById('messageInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (!activeChatUser || !message) return alert('Please select a user and enter a message!');

    socket.emit('sendMessage', { to: activeChatUser, message });

    const messageElement = document.createElement('div');
    messageElement.textContent = ` ${message}`;
    messageElement.classList.add('sent');
    document.getElementById('messages').appendChild(messageElement);

    messageInput.value = '';
}

socket.on('receiveMessage', (data) => {
    if (activeChatUser !== data.from) return;

    const messageElement = document.createElement('div');
    messageElement.textContent = ` ${data.content}`;
    messageElement.classList.add('received');
    document.getElementById('messages').appendChild(messageElement);
});

fetchAddedUsers();

// Channels

searchChannelButton.addEventListener('click', async () => {
    const query = searchChannelInput.value.trim();
    if (!query) return;

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

// Add the logout functionality
document.getElementById('logoutButton').addEventListener('click', () => {
    // Clear the token cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Clear the email from localStorage
    localStorage.removeItem('email');
    
    // Disconnect the socket
    socket.disconnect();
    
    // Redirect to the login page
    window.location.href = '/login.html';
});

function showChatOverlay() {
    const chat = document.getElementById('chat');
    // Add the blur class
    chat.classList.add('blurred');
    // Ensure the overlay is visible
    const overlay = document.getElementById('chatOverlay');
    if (overlay) overlay.style.display = 'flex';
}

function hideChatOverlay() {
    const chat = document.getElementById('chat');
    chat.classList.remove('blurred');
    const overlay = document.getElementById('chatOverlay');
    if (overlay) overlay.style.display = 'none';
}

// On initial page load assume no chat is selected, so show the overlay.
document.addEventListener('DOMContentLoaded', showChatOverlay);
