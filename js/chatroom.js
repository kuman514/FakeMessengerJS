const chatroomTitle = document.querySelector('#chatroom-title');

const chatList = document.querySelector('#chat-list');

const messageToSend = document.querySelector('#message-to-send');
const sender = messageToSend.querySelector('#sender');
const message = messageToSend.querySelector('#message');

// {id, nickname, profilePic, bgPic, birthday}
const users = [];

// {id, senderId, message, timestamp}
const chats = [];

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

  saveUsersToLocalStorage();
}

function saveUsersToLocalStorage() {
  localStorage.setItem(MY_PROFILE_KEY, JSON.stringify(users[0]));
  localStorage.setItem(OPPONENTS_PROFILE_KEY, JSON.stringify(users.slice(1)));
}

function loadChatFromLocalStorage() {
}

function saveChatsToLocalStorage() {
}

function getUserIndex(userId) {
  for (const index in users) {
    if (users[index].id === userId) {
      return index;
    }
  }
  return null;
}

function pushChat(newChat) {
  chats.push({
    id: newChat.id,
    senderId: newChat.senderId,
    message: newChat.message,
    timestamp: newChat.timestamp
  });
}

function paintChat(newChat) {
  const newChatElement = document.createElement('div');
  newChatElement.id = newChat.id;
  const sendUser = users[getUserIndex(newChat.senderId)];

  switch (newChat.senderId) {
    case 0:
      newChatElement.className = MY_CHAT_CLASSNAME;
      break;
    default:
      newChatElement.className = OPPONENT_CHAT_CLASSNAME;
      const profilePic = document.createElement('img');
      profilePic.className = PROFILE_PIC_CLASSNAME;
      profilePic.src = sendUser.profilePic;
      newChatElement.appendChild(profilePic);
      break;
  }

  const chatContent = document.createElement('div');
  const who = document.createElement('span');
  who.innerText = sendUser.nickname;
  const msg = document.createElement('span');
  msg.innerText = newChat.message;

  chatContent.appendChild(who);
  chatContent.appendChild(msg);
  newChatElement.appendChild(chatContent);

  chatList.appendChild(newChatElement);
}

messageToSend.addEventListener('submit', (event) => {
  event.preventDefault();
  const newChat = {
    id: Date.now(),
    senderId: parseInt(sender.value),
    message: message.value,
    timestamp: new Date()
  }
  pushChat(newChat);
  paintChat(newChat);
  saveChatsToLocalStorage();
  message.value = '';
});
loadUsersFromLocalStorage();
