chatList.addEventListener('click', onClickedChatButton);
messageToSend.addEventListener('submit', onMessageSubmit);

userListCloseButton.addEventListener('click', closeUserConfig);
userModify.addEventListener('submit', onModifySubmit);
userCreate.addEventListener('submit', onCreateSubmit);
userCreateButton.addEventListener('click', onCreateUser);
userConfigButton.addEventListener('click', toggleVisibilityUserConfig);
cancelModify.addEventListener('click', closeUserModify);
cancelCreate.addEventListener('click', closeUserCreate);

titleModify.addEventListener('submit', onTitleModifySubmit);
titleModifyButton.addEventListener('click', toggleVisibilityTitleModify);

loadTitleFromLocalStorage();
loadUsersFromLocalStorage();
loadChatFromLocalStorage();
