$(document).ready(function() {
  // Submit post event
  $('#submitbtn').off().on('click', function(e) {
    e.preventDefault();

    var text = document.getElementById('inputtext').value;
    
    var newMessage = {
      username: app.username,
      text: text,
      room: null
    };
    
    app.send(newMessage);
  });
  // when room selected, fire this listener
  $('#roomselect').change(function(e) {
    e.preventDefault();   
    app.renderRoom(e.target.value);
  });
});