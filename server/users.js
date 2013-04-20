Accounts.onCreateUser(function(options, user) {
  // check if there are other users in the region and send emails if so
  console.log("// new user created //");

  var accessToken = user.services.github.accessToken,
    result,
    profile;

  result = Meteor.http.get("https://api.github.com/user", {
    params: {
      access_token: accessToken
    }
  });

  if (result.error)
    throw result.error;

console.log(result.data)
console.log('-----------------------')
  profile = _.pick(result.data,
    "login",
    "name",
    "avatar_url",
    "url",
    "company",
    "blog",
    "location",
    "email",
    "bio",
    "html_url");

  user.profile = profile;

  console.log(user)

  return user;
});