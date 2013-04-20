Template.lookup.events({
  "click .lookup":function(event){
    Meteor.http.call("GET", "http://maps.googleapis.com/maps/api/geocode/json?address="+$("#lookup_address").val()+"&sensor=false",
      function(error,result) {
        console.log(result);
        var latitude=result.data.results[0].geometry.location.lat;
        var longitude=result.data.results[0].geometry.location.lng;
        //TODO action
      }
    );
  },
  "click .geolocation":function(event){
    console.log("geolocation");
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
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