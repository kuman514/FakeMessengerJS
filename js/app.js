messageToSend.addEventListener('submit', onMessageSubmit);
userModify.addEventListener('submit', onModifySubmit);
userCreate.addEventListener('submit', onCreateSubmit);
userCreateButton.addEventListener('click', onCreateUser);
loadUsersFromLocalStorage();
loadChatFromLocalStorage();
