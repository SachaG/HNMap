Template.addMeetup.events({
  'submit form': function(event) {
    event.preventDefault();
    
    var meetup = {
      url: $(event.target).find('[name=url]').val(),
      city: $(event.target).find('[name=city]').val()
    }

    // Meetups.insert(meetup);
    
    Meteor.call('addMeetup', meetup, function(error, id) {
      console.log(error);
    });
  }
});