const senderSelect = document.querySelector('#sender');

const userListConfig = document.querySelector('#user-list-config');
const userList = document.querySelector('#user-list');

// {id, nickname, profilePic, bgPic, birthday}
const users = [];

function getUserIndex(userId) {
  for (const index in users) {
    if (users[index].id === userId) {
      return index;
    }
  }
  return null;
}

function loadUsersFromLocalStorage() {
  const loadedMe = localStorage.getItem(MY_PROFILE_KEY);
  if (loadedMe === null) {
    users.push({
      id: 0,
      nickname: 'default me',
      profilePic: '',
      bgPic: '',
      birthday: new Date()
    });
  } else {
    users.push(JSON.parse(loadedMe));
  }

  const loadedOpponents = localStorage.getItem(OPPONENTS_PROFILE_KEY);
  if (loadedOpponents === null || loadedOpponents === '[]') {
    users.push({
      id: Date.now(),
      nickname: 'default opponent',
      profilePic: '',
      bgPic: '',
      birthday: new Date()
    });
  } else {
    users.push(...(JSON.parse(loadedOpponents)));
  }

  for (const user of users) {
    paintUser(user);
  }
  saveUsersToLocalStorage();
}

function saveUsersToLocalStorage() {
  localStorage.setItem(MY_PROFILE_KEY, JSON.stringify(users[0]));
  localStorage.setItem(OPPONENTS_PROFILE_KEY, JSON.stringify(users.slice(1)));
}

function paintUserSelect(newUser) {
  const newOption = document.createElement('option');
  newOption.value = newUser.id;
  newOption.innerText = newUser.nickname;
  newOption.id = `sender-${newUser.id}`;

  senderSelect.appendChild(newOption);
}

function onRemoveUser(event) {
  const removeId = parseInt(event.target.parentElement.id);
  event.target.parentElement.remove();

  const removeSelection = document.querySelector(`#sender-${removeId}`);
  if (removeSelection !== null) {
    removeSelection.remove();
  }

  for (const index in users) {
    if (users[index].id === removeId) {
      users.splice(index, 1);
      break;
    }
  }

  saveUsersToLocalStorage();
}

function paintUserListItem(newUser) {
  const newListItem = document.createElement('li');
  newListItem.id = newUser.id;
  newListItem.innerText = newUser.nickname;

  //const modifyButton = document.createElement('button');

  if (newUser.id !== 0) {
    const removeButton = document.createElement('button');
    removeButton.innerText = '❌';
    removeButton.addEventListener('click', onRemoveUser);
    newListItem.appendChild(removeButton);
  }

  userList.appendChild(newListItem);
}

function paintUser(newUser) {
  paintUserSelect(newUser);
  paintUserListItem(newUser);
}
