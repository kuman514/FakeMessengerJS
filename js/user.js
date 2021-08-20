const senderSelect = document.querySelector('#sender');

const userListConfig = document.querySelector('#user-list-config');
const userList = document.querySelector('#user-list');

const userModify = document.querySelector('#user-modify');
const savedUserId = userModify.querySelector('#user-id-save');
const nicknameModify = userModify.querySelector('#nickname-modify');
const profilePicModify = userModify.querySelector('#profile-pic-modify');

const userCreateButton = document.querySelector('#user-create-button');
const userCreate = document.querySelector('#user-create');
const nicknameCreate = userCreate.querySelector('#nickname-create');
const profilePicCreate = userCreate.querySelector('#profile-pic-create');

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

function onCreateUser() {
  userCreate.classList.remove(HIDDEN_CLASSNAME);
}

function onCreateSubmit(event) {
  event.preventDefault();
  const newUser = {
    id: Date.now(),
    nickname: nicknameCreate.value,
    profilePic: profilePicCreate.value,
    bgPic: '',
    birthday: new Date()
  };

  nicknameCreate.value = '';
  profilePicCreate.value = '';

  users.push(newUser);
  saveUsersToLocalStorage();
  paintUser(newUser);

  userCreate.classList.add(HIDDEN_CLASSNAME);
}

function onModifyUser(event) {
  const idString = event.target.parentElement.id.split('-')[1];
  const modifyId = parseInt(idString);
  const modifyingUser = users[getUserIndex(modifyId)];

  savedUserId.value = modifyId;
  nicknameModify.value = modifyingUser.nickname;
  profilePicModify.value = modifyingUser.profilePic;

  userModify.classList.remove(HIDDEN_CLASSNAME);
}

function onModifySubmit(event) {
  event.preventDefault();
  const modifyId = parseInt(savedUserId.value);

  const modifyingUserIndex = getUserIndex(modifyId);
  users[modifyingUserIndex].nickname = nicknameModify.value;
  users[modifyingUserIndex].profilePic = profilePicModify.value;

  const modifyListItem = document.querySelector(`#li-${modifyId} span`);
  if (modifyListItem !== null) {
    modifyListItem.innerText = nicknameModify.value;
  }

  const modifySelection = document.querySelector(`#sender-${modifyId}`);
  if (modifySelection !== null) {
    modifySelection.innerText = nicknameModify.value;
  }

  userModify.classList.add(HIDDEN_CLASSNAME);
  saveUsersToLocalStorage();

  reapintChat();
}

function onRemoveUser(event) {
  const idString = event.target.parentElement.id.split('-')[1];
  const removeId = parseInt(idString);
  event.target.parentElement.remove();

  const removeSelection = document.querySelector(`#sender-${removeId}`);
  if (removeSelection !== null) {
    removeSelection.remove();
  }

  users.splice(getUserIndex(removeId), 1);
  saveUsersToLocalStorage();

  reapintChat();
}

function paintUserListItem(newUser) {
  const newListItem = document.createElement('li');
  newListItem.id = `li-${newUser.id}`;

  const liNickname = document.createElement('span');
  liNickname.innerText = newUser.nickname;
  newListItem.appendChild(liNickname);

  const modifyButton = document.createElement('button');
  modifyButton.innerText = '🔧';
  modifyButton.addEventListener('click', onModifyUser);
  newListItem.appendChild(modifyButton);

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
