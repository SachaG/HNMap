Template.header.events({
  'click .login': function(event) {
    event.preventDefault();
    Meteor.loginWithGithub({
      requestPermissions: ['user:email']
    }, function (err) {
      if (err)
        Session.set('errorMessage', err.reason || 'Unknown error');
    });
  }
});