Session.set("meetupsLoaded", false);

Meteor.subscribe("meetups", function(){
	console.log("meetups ready");
	Session.set("meetupsLoaded", true);
});