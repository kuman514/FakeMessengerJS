const chatroomTitle = document.querySelector('#chatroom-title');

const titleModifyButton = document.querySelector('#title-modify-button');
const titleModify = document.querySelector('#title-modify');
const titleInput = titleModify.querySelector('#title-input');

function showTitleModify() {
  titleInput.value = chatroomTitle.innerText;
  titleModify.classList.remove(HIDDEN_CLASSNAME);
}

function closeTitleModify(event) {
  if (event) {
    event.preventDefault();
  }

  titleModify.classList.add(HIDDEN_CLASSNAME);
}

function onTitleModifySubmit(event) {
  event.preventDefault();
  chatroomTitle.innerText = titleInput.value;
  titleInput.value = '';
  closeTitleModify();
}
