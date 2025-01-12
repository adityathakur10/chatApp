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

// Search for users
searchUserButton.addEventListener('click', async () => {
    const query = searchUserInput.value.trim();
    if (!query) return;

    const response = await fetch('/add-user', {
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
        });
        userSearchResults.appendChild(resultItem);
    } else {
        const errorItem = document.createElement('li');
        errorItem.textContent = 'User not found!';
        userSearchResults.appendChild(errorItem);
    }
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
