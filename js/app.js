messageToSend.addEventListener('submit', onMessageSubmit);

userModify.addEventListener('submit', onModifySubmit);
userCreate.addEventListener('submit', onCreateSubmit);
userCreateButton.addEventListener('click', onCreateUser);
userConfigButton.addEventListener('click', toggleVisibilityUserConfig);
cancelModify.addEventListener('click', closeUserModify);
cancelCreate.addEventListener('click', closeUserCreate);

titleModify.addEventListener('submit', onTitleModifySubmit);
titleModifyButton.addEventListener('click', showTitleModify);

loadUsersFromLocalStorage();
loadChatFromLocalStorage();
