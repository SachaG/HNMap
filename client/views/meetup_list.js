Template.meetupList.helpers({
  meetups: function(){
    return Meetups.find();
  }
});