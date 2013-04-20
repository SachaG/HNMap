var updateUserLocation = function(lng, lat){

  var feature = {        
    "geometry": {
          "type": "Point",
          "coordinates": [lng, lat]
      }
    }
  console.log(feature);
  Session.set("coordinates",[lng, lat]);
  Template.meetupList.update();
  Meteor.users.update(Meteor.userId(), {$set: {
    "profile.loc": [lng, lat],
    "profile.feature": feature
  }});  
}
Template.lookup.rendered=function() {
  if(navigator.geolocation) {
    $(".geolocation").show();
  }
}
Template.lookup.events({
  "click .lookup":function(event){
    Meteor.http.call("GET", "http://maps.googleapis.com/maps/api/geocode/json?address="+$("#lookup_address").val()+"&sensor=false",
      function(error,result) {
        console.log(result);
        var lat=result.data.results[0].geometry.location.lat;
        var lng=result.data.results[0].geometry.location.lng;

        updateUserLocation(lng, lat);
        map.centerzoom({
          lat: lat,
          lon: lng
        }, 5);

      }
    );
  },
  "click .geolocation":function(event){
    console.log("geolocation");
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var lng = position.coords.longitude,
            lat = position.coords.latitude;
        updateUserLocation(lng, lat);
        map.centerzoom({
          lat: lat,
          lon: lng
        }, 5);
        //Session.set("latitude",position.coords.latitude);
        //Session.set("longitude",position.coords.longitude);
        Meteor.http.call("GET","http://maps.googleapis.com/maps/api/geocode/json?latlng="+
          position.coords.latitude+","+position.coords.longitude+"&sensor=true",function(error,result) {
            console.log(error);
            console.log(result.data.results[0].formatted_address);
            $("#lookup_address").val(result.data.results[0].formatted_address);
            //TODO action
          }
        );
      });
    }
  }
}
);