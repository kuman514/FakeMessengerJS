const senderSelect = document.querySelector('#sender');

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
  if (loadedOpponents === null) {
    users.push({
      id: 1,
      nickname: 'default opponent',
      profilePic: '',
      bgPic: '',
      birthday: new Date()
    });
  } else {
    users.push(...(JSON.parse(loadedOpponents)));
  }

  for (const user of users) {
    paintUserSelect(user);
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

  senderSelect.appendChild(newOption);
}
