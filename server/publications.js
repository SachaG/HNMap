Meteor.publish('meetups', function() {
  return Meetups.find();
});

Meteor.publish('currentUser', function() {
  return Meteor.users.find(this.userId);
});

Meteor.publish('allUsers', function() {
  return Meteor.users.find();
});