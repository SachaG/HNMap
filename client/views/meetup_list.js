Template.meetupList.helpers({
  meetups: function(){
    return Meetups.find();
  }
});

Template.meetupList.rendered = function(){
  // GeoJSON input features
    // The image and url properties of the features will be used in
    // the tooltips
    var features = [{
        "geometry": { "type": "Point", "coordinates": [135.50, 34.69]},
        "properties": {
            "image": "",
            "url": "http://www.hnkansai.org",
            "city": "HN Kansai", "marker-size": "medium",
"marker-color": "#f44"
        }
    }, {
        "geometry": { "type": "Point", "coordinates": [139.69, 35.68]},
        "properties": {
            "image": "",
            "url": "http://www.hnkansai.org",
            "city": "HN Tokyo", "marker-size": "medium",
"marker-color": "#f44"
        }
    }, {
        "geometry": { "type": "Point", "coordinates": [-87.63, 41.88]},
        "properties": {
            "image": "",
            "url": "http://en.wikipedia.org/wiki/Chicago",
            "city": "Chicago", "marker-size": "medium",
"marker-color": "#f44"
        }
    }, {
        "geometry": { "type": "Point", "coordinates": [-74.00, 40.71]},
        "properties": {
            "image": "",
            "url": "http://en.wikipedia.org/wiki/New_York_City",
            "city": "New York City",
		"marker-size": "medium",
"marker-color": "#f44"
        }
    }];

    // Create map
    var map = mapbox.map('map');
    map.addLayer(mapbox.layer().id('ekianjohnkansai.map-acek7fr6'));

    // Create and add marker layer
    var markerLayer = mapbox.markers.layer().features(features);
    var interaction = mapbox.markers.interaction(markerLayer);
    map.addLayer(markerLayer);

    // Set a custom formatter for tooltips
    // Provide a function that returns html to be used in tooltip
    interaction.formatter(function(feature) {
        var o = '<a target="_blank" href="' + feature.properties.url + '">' +
            '<img src="' + feature.properties.image + '">' +
            '<h2 class="titleh2">' + feature.properties.city + '</h2>' +
            '</a>' ;

        return o;
    });

    // Set iniital center and zoom
    map.centerzoom({
        lat: 30.908,
        lon: 0
    }, 2);

map.ui.zoomer.add();


    // Attribute map
    map.ui.attribution.add()
        .content('<a href="http://mapbox.com/about/maps">Terms &amp; Feedback</a>');
};
