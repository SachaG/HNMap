Template.meetupList.helpers({
  meetups: function(){
    return Meetups.find();
  }
});

Template.meetup.events({
  "click .delete-link": function(event, instance){
    event.preventDefault();
    Meetups.remove(instance.data._id);
  }
});