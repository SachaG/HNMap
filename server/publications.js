// Meteor.publish('currentUser', function() {
//   return Meteor.users.find(this.userId);
// });

// Meteor.publish('allUsers', function() {
//   if (this.userId && isAdminById(this.userId)) {
//     // if user is admin, publish all fields
//     return Meteor.users.find();
//   }else{
//     // else, filter out sensitive info
//     return Meteor.users.find({}, {fields: {
//       secret_id: false,
//       isAdmin: false,
//       emails: false,
//       notifications: false,
//       'profile.email': false,
//       'services.twitter.accessToken': false,
//       'services.twitter.accessTokenSecret': false,
//       'services.twitter.id': false,
//       'services.password': false
//     }});
//   }
// });