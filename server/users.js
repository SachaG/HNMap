Accounts.onCreateUser(function(options, user) {
  // check if there are other users in the region and send emails if so
  console.log("// new user created //");
  return user;
});