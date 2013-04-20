Template.meetupMap.helpers({
  meetups: function(){
    return Meetups.find();
  }
})

Template.meetupMap.rendered = function(){
  if(Session.get("meetupsLoaded")){
    //console.log(Session.get("meetupsLoaded"))
  Deps.autorun(function(){
    //console.log(Meetups.find().fetch())
    var meetupLocations = _.pluck(Meetups.find().fetch(), 'feature');

    // reverse coordinates so that MapBox is happy
    _.each(meetupLocations, function(feature){
      feature.geometry.coordinates = feature.geometry.coordinates.reverse();
      feature.properties["marker-size"] = "medium";
      feature.properties["marker-color"] = "#f44";
    });

    var userLocations = [];

    _.each(Meteor.users.find().fetch(), function(user){
      if(user.profile && user.profile.feature){
        var feature = user.profile.feature;

        feature.properties = {
          "marker-size": "medium",
          "marker-color": "#4f4",
          "city": user.profile.name
        }
        userLocations.push(feature);
      }
    });

    var features = meetupLocations.concat(userLocations);

    // Create map
    map = mapbox.map('map');
    map.addLayer(mapbox.layer().id('ekianjohnkansai.map-acek7fr6'));

    // Create and add marker layer
    var markerLayer = mapbox.markers.layer().features(features);
    var interaction = mapbox.markers.interaction(markerLayer);
    map.addLayer(markerLayer);

    // Set a custom formatter for tooltips
    // Provide a function that returns html to be used in tooltip
    interaction.formatter(function(feature) {
        var o = '<a target="_blank" href="' + feature.properties.url + '">' +
            '<h2 class="titleh2">' + feature.properties.city + '</h2>' +
            '</a>';

        return o;
    });

    // Set iniital center and zoom
    map.centerzoom({
        lat: 30.908,
        lon: 0
    }, 2);

    map.ui.zoomer.add();


    // Attribute map
    map.ui.attribution.add().content('<a href="http://mapbox.com/about/maps">Terms &amp; Feedback</a>');
  });
  }
};