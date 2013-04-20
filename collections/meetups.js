Meetups = new Meteor.Collection('meetups');

Meteor.methods({
    addMeetup: function(meetupAttributes){
      var city = meetupAttributes.city;
      var geo = Meteor.http.call("GET", url );

      console.log(city);
      console.log(geo);

      // Meetups.insert(meetupAttributes);
    }
})