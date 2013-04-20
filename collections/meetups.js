Meetups = new Meteor.Collection('meetups');

Meteor.methods({
    addMeetup: function(meetupAttributes){
      var city = meetupAttributes.city;
      if(Meteor.isServer){
        var geo = Meteor.http.call("GET", "http://maps.googleapis.com/maps/api/geocode/json?address="+city+"&sensor=false");
      }
      console.log(city);
      console.log(geo);

      // Meetups.insert(meetupAttributes);
    }
})