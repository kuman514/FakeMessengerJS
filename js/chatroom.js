const chatroomTitle = document.querySelector('#chatroom-title');

const chatList = document.querySelector('#chat-list');

const messageToSend = document.querySelector('#message-to-send');
const sender = messageToSend.querySelector('#sender');
const message = messageToSend.querySelector('#message');

// {id, senderId, message, timestamp}
const chats = [];

function loadChatFromLocalStorage() {
  const loadedRawMessages = localStorage.getItem(MESSAGES_KEY);
  if (loadedRawMessages !== null) {
    const loadedMessages = JSON.parse(loadedRawMessages);
    for (const msg of loadedMessages) {
      pushChat(msg);
      paintChat(msg);
    }
  }
}

function saveChatsToLocalStorage() {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(chats));
}

function pushChat(newChat) {
  chats.push({
    id: newChat.id,
    senderId: newChat.senderId,
    message: newChat.message,
    timestamp: newChat.timestamp
  });
}

function clearChat() {
  chatList.innerText = '';
}

function reapintChat() {
  clearChat();
  for (const msg of chats) {
    paintChat(msg);
  }
}

function paintChat(newChat) {
  const newChatElement = document.createElement('div');
  newChatElement.id = newChat.id;
  const sendUserIndex = getUserIndex(newChat.senderId);
  const sendUser = (sendUserIndex !== null) ? users[sendUserIndex] : {
    id: null,
    nickname: '(알 수 없음)',
    profilePic: '',
    bgPic: '',
    birthday: ''
  };

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

function onMessageSubmit(event) {
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
}
