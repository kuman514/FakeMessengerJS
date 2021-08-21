const chatroomTitle = document.querySelector('#chatroom-title');

const titleModifyButton = document.querySelector('#title-modify-button');
const titleModify = document.querySelector('#title-modify');
const titleInput = titleModify.querySelector('#title-input');

function loadTitleFromLocalStorage() {
  const loadedTitle = localStorage.getItem(CHATROOM_TITLE_KEY);
  if (loadedTitle !== null) {
    chatroomTitle.innerText = loadedTitle;
  } else {
    chatroomTitle.innerText = 'default chatroom title';
    saveTitleToLocalStorage();
  }
}

function saveTitleToLocalStorage() {
  localStorage.setItem(CHATROOM_TITLE_KEY, chatroomTitle.innerText);
}

function toggleVisibilityTitleModify() {
  if (titleModify.classList.contains(HIDDEN_CLASSNAME)) {
    showTitleModify();
  } else {
    closeTitleModify();
  }
}

function showTitleModify() {
  titleInput.value = chatroomTitle.innerText;
  chatroomTitle.classList.add(HIDDEN_CLASSNAME);
  titleModify.classList.remove(HIDDEN_CLASSNAME);
}

function closeTitleModify(event) {
  if (event) {
    event.preventDefault();
  }

  titleInput.value = '';
  titleModify.classList.add(HIDDEN_CLASSNAME);
  chatroomTitle.classList.remove(HIDDEN_CLASSNAME);
}

function onTitleModifySubmit(event) {
  event.preventDefault();
  chatroomTitle.innerText = titleInput.value;
  saveTitleToLocalStorage();
  closeTitleModify();
}
