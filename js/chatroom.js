const chatList = document.querySelector('#chat-list');

const messageToSend = document.querySelector('#message-to-send');
const sender = messageToSend.querySelector('#sender');
const message = messageToSend.querySelector('#message');

// {id, senderId, message, timestamp}
const chats = [];

function getChatIndex(chatId) {
  for (const index in chats) {
    if (chats[index].id === chatId) {
      return index;
    }
  }
  return null;
}

function loadChatFromLocalStorage() {
  const loadedRawMessages = localStorage.getItem(MESSAGES_KEY);
  if (loadedRawMessages !== null) {
    const loadedMessages = JSON.parse(loadedRawMessages);
    for (const msg of loadedMessages) {
      msg.timestamp = new Date(msg.timestamp);
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

function repaintChat() {
  clearChat();
  for (const msg of chats) {
    paintChat(msg);
  }
}

function paintChat(newChat) {
  const newChatElement = document.createElement('div');
  newChatElement.id = `message-${newChat.id}`;
  const sendUserIndex = getUserIndex(newChat.senderId);
  const sendUser = (sendUserIndex !== null) ? users[sendUserIndex] : {
    id: null,
    nickname: '(알 수 없음)',
    birthday: ''
  };

  const chatContent = document.createElement('div');
  const who = document.createElement('span');
  who.innerText = sendUser.nickname;
  const msg = document.createElement('span');
  msg.innerText = newChat.message;
  const ts = document.createElement('span');
  ts.innerText = newChat.timestamp;

  const deleteButton = document.createElement('button');
  deleteButton.innerText = '❌';
  deleteButton.addEventListener('click', removeMessage);

  newChatElement.appendChild(who);
  
  switch (newChat.senderId) {
    case 0:
      newChatElement.className = MY_CHAT_CLASSNAME;
      chatContent.appendChild(deleteButton);
      chatContent.appendChild(ts);
      chatContent.appendChild(msg);
      break;
    default:
      newChatElement.className = OPPONENT_CHAT_CLASSNAME;
      chatContent.appendChild(msg);
      chatContent.appendChild(ts);
      chatContent.appendChild(deleteButton);
      break;
  }

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

function removeMessage(event) {
  const deleteMsgId = parseInt(event.target.parentElement.parentElement.id.split('-')[1]);
  event.target.parentElement.parentElement.remove();
  chats.splice(getChatIndex(deleteMsgId), 1);
  saveChatsToLocalStorage();
}
