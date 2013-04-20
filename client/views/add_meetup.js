Template.addMeetup.events({
  'submit form': function(event) {
    event.preventDefault();
    var meetup = {
      url: $(event.target).find('[name=url]').val(),
      city: $(event.target).find('[name=city]').val(),
      country: $(event.target).find('[name=country]').val()
    }

    Meteor.http.call("GET", "http://maps.googleapis.com/maps/api/geocode/json?address="+meetup.city+","+meetup.country+"&sensor=false", function(error,result){
      console.log(result.data.results[0].geometry.location);
      meetup.location = result.data.results[0].geometry.location;
      console.log(meetup)
      Meetups.insert(meetup);
    });


    
    // Meteor.call('addMeetup', meetup, function(error, id) {
    //   console.log(error);
    // });
  }
});