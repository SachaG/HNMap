meetupsJson = [
{name: "blabla"},
{name: "truc machin"}
]


Template.list.helpers({
  meetups: function(){
    return Meetups.find();
  }
});