Template.meetupSubmit.events({
  'submit form': function(event) {
    event.preventDefault();
    var meetup = {
      url: $(event.target).find('[name=url]').val(),
      city: $(event.target).find('[name=city]').val(),
      country: $(event.target).find('[name=country]').val()
    }

    Meteor.http.call("GET", "http://maps.googleapis.com/maps/api/geocode/json?address="+meetup.city+","+meetup.country+"&sensor=false", function(error,result){
      var lat = result.data.results[0].geometry.location.lat;
      var lng = result.data.results[0].geometry.location.lng;
      meetup.feature = {
        "geometry": {
            "type": "Point",
            "coordinates": [lat, lng]
        },
        "properties": {
            "url": meetup.url,
            "city": meetup.city
        }
      }
      meetup.loc = [lat, lng];

      Meetups.insert(meetup);
    });
  }
});