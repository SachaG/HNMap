function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = (lat2 - lat1).toRad();
  var dLon = (lon2 - lon1).toRad(); 
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  var d = R * c;
  return d;
}

Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}

var currentCoordDep = new Deps.Dependency;
Template.meetupList.update=function() {
  currentCoordDep.changed();
}
Template.meetupList.helpers({
  meetups: function(){
    currentCoordDep.depend();
  	var list=Meetups.find().fetch();
  	var coordinates=Session.get("coordinates");
    //console.log(typeof(coordinates));
  	if(typeof(coordinates)!="undefined") {
      //console.log("sort");
  		var lat=coordinates[1];
  		var lng=coordinates[0];
      //console.log(list);
  		list=list.sort(function(a,b) {
  			var lat_a=a.feature.geometry.coordinates[0];
  			var lng_a=a.feature.geometry.coordinates[1];
  			var dist_a=calculateDistance(lat,lng,lat_a,lng_a);
  			var lat_b=b.feature.geometry.coordinates[0];
  			var lng_b=b.feature.geometry.coordinates[1];
  			var dist_b=calculateDistance(lat,lng,lat_b,lng_b);
        a.dist=dist_a;
        b.dist=dist_b;
  			if(dist_a<dist_b){return -1;}
        if(dist_a>dist_b){return 1;}
        return 0;
  		});
      //console.log(list);
  	}
    return list;
  }
});
Deps.autorun(function () {
  Meteor.subscribe("counts-by-room", Session.get("coordinates"));
});
Template.meetup.events({
  "click .delete-link": function(event, instance){
    event.preventDefault();
    Meetups.remove(instance.data._id);
  }
});