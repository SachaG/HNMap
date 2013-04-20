Template.userLocate.events({
  'submit form': function(event) {
    event.preventDefault();
    var loc= $(event.target).find('[name=loc]').val();

    var loc = [30, 2];

    var feature = {        
      "geometry": {
            "type": "Point",
            "coordinates": [30, 2]
        },
        "properties": {
            "url": Meteor.user().profile.html_url,
            "city": "Paris"
        }
      }
    console.log(loc);

    Meteor.users.update(Meteor.userId(), {$set: {
      "profile.loc": loc,
      "profile.feature": feature
    }});

  }
});