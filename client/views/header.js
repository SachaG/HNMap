
Template.header.events({
  'click .login': function(event) {
    event.preventDefault();
    console.log(123)
    Meteor.loginWithGithub({
      requestPermissions: ['user:email']
    }, function (err) {
      if (err)
        Session.set('errorMessage', err.reason || 'Unknown error');
    });
  }
});