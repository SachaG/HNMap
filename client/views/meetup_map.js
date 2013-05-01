Template.meetupMap.helpers({
  meetups: function(){
    return Meetups.find();
  }
})

var map;
var features;

Template.meetupMap.rendered = function(){
  // Create map
  map = mapbox.map('map');
  map.addLayer(mapbox.layer().id('ekianjohnkansai.map-acek7fr6'));
  // Set iniital center and zoom
  map.centerzoom({
    lat: 30.908,
    lon: 0
  }, 2);

  map.ui.zoomer.add();

  // Attribute map
  map.ui.attribution.add().content('<a href="http://mapbox.com/about/maps">Terms &amp; Feedback</a>');

  // Initial feature set is empty
  features = [];
  
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
  
  
  Meetups.find({}).observe({
    'added': function(document) {
      // Create a new feature object from this new Meetup
      var feature = document.feature;
      feature.geometry.coordinates = feature.geometry.coordinates.reverse();
      feature.properties["marker-size"] = "medium";
      feature.properties["marker-color"] = "#f44";
      feature._id = document._id;
      
      // Add it to our list of feature
      features.push(feature);
      
      // Update the map
      markerLayer.features(features);
    },
    'removed': function(oldDocument) {
      // Remove the feature object that described this Meetup
      features = _.reject(features, function(feature) {
        return feature._id == oldDocument._id;
      });
      
      // Update the map
      markerLayer.features(features);
    },
    'changed': function(newDocument, oldDocument) {
      // Find the feature object that describes this Meetup
      var feature = _.find(features, function(f) {
        return f._id == oldDocument._id;
      });
      
      // Update it with the new information
      _.extend(feature, newDocument.feature);
      feature.geometry.coordinates = feature.geometry.coordinates.reverse();
      feature.properties["marker-size"] = "medium";
      feature.properties["marker-color"] = "#f44";
      
      // Update the map
      markerLayer.features(features);
    }
  });
}
