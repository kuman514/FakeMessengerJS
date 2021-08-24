const senderSelect = document.querySelector('#sender');

const userConfigButton = document.querySelector(`#user-config-button`);
const userListCloseButton = document.querySelector('#user-list-close-button');
const userListConfig = document.querySelector('#user-list-config');
const userList = document.querySelector('#user-list');

const userModify = document.querySelector('#user-modify');
const savedUserId = userModify.querySelector('#user-id-save');
const nicknameModify = userModify.querySelector('#nickname-modify');
const commentModify = userModify.querySelector('#comment-modify');
const birthdayModify = userModify.querySelector('#birthday-modify');
const cancelModify = userModify.querySelector('#cancel-modify');

const userCreateButton = document.querySelector('#user-create-button');
const userCreate = document.querySelector('#user-create');
const nicknameCreate = userCreate.querySelector('#nickname-create');
const commentCreate = userCreate.querySelector('#comment-create');
const birthdayCreate = userCreate.querySelector('#birthday-create');
const cancelCreate = userCreate.querySelector('#cancel-create');

// {id, nickname, comment, birthday}
const users = [];

function showUserConfig() {
  userListConfig.classList.remove(HIDDEN_CLASSNAME);
}

function closeUserConfig() {
  userListConfig.classList.add(HIDDEN_CLASSNAME);
}

function toggleVisibilityUserConfig() {
  if (userListConfig.classList.contains(HIDDEN_CLASSNAME)) {
    showUserConfig();
  } else {
    closeUserConfig();
  }
}

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
      comment: 'Hello myself',
      birthday: ''
    });
  } else {
    users.push(JSON.parse(loadedMe));
  }

  const loadedOpponents = localStorage.getItem(OPPONENTS_PROFILE_KEY);
  if (loadedOpponents === null || loadedOpponents === '[]') {
    users.push({
      id: Date.now(),
      nickname: 'default opponent',
      comment: 'Hello opponent',
      birthday: ''
    });
  } else {
    users.push(...(JSON.parse(loadedOpponents)));
  }

  for (const user of users) {
    paintUser(user);
  }

  if (loadedMe === null || loadedOpponents === null || loadedOpponents === '[]') {
    saveUsersToLocalStorage();
  }
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
    comment: commentCreate.value,
    birthday: birthdayCreate.value
  };

  users.push(newUser);
  closeUserCreate(event);
  saveUsersToLocalStorage();
  paintUser(newUser);
}

function closeUserCreate(event) {
  if (event) {
    event.preventDefault();
  }

  nicknameCreate.value = '';
  commentCreate.value = '';
  birthdayCreate.value = '';
  userCreate.classList.add(HIDDEN_CLASSNAME);
}

function onModifyUser(event) {
  const idString = event.target.parentElement.id.split('-')[1];
  const modifyId = parseInt(idString);
  const modifyingUser = users[getUserIndex(modifyId)];

  savedUserId.value = modifyId;
  nicknameModify.value = modifyingUser.nickname;
  commentModify.value = modifyingUser.comment;
  birthdayModify.value = modifyingUser.birthday;

  userModify.classList.remove(HIDDEN_CLASSNAME);
}

function onModifySubmit(event) {
  event.preventDefault();
  const modifyId = parseInt(savedUserId.value);

  const modifyingUserIndex = getUserIndex(modifyId);
  users[modifyingUserIndex].nickname = nicknameModify.value;
  users[modifyingUserIndex].comment = commentModify.value;
  users[modifyingUserIndex].birthday = birthdayModify.value;

  const modifyListItem = document.querySelector(`#li-${modifyId} span`);
  if (modifyListItem !== null) {
    modifyListItem.innerText = nicknameModify.value;
  }

  const modifySelection = document.querySelector(`#sender-${modifyId}`);
  if (modifySelection !== null) {
    modifySelection.innerText = nicknameModify.value;
  }

  closeUserModify(event);
  saveUsersToLocalStorage();
  repaintChat();
}

function closeUserModify(event) {
  if (event) {
    event.preventDefault();
  }
  
  savedUserId.value = '';
  nicknameModify.value = '';
  commentModify.value = '';
  birthdayModify.value = '';
  userModify.classList.add(HIDDEN_CLASSNAME);
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

  repaintChat();
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
