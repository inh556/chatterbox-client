var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  // will be run on page load
  init: function() {
    console.log('This page is ready!'); 
  },
  //send message to server
  send: function(message) {

  },
  //get message from server
  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: data received', data);
        
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  // clear messages on chat
  clearMessages: function() {
    
  },
  // When called, shoul add message to page, accepts a message obj
  renderMessage: function(message) {
    var message = {
      username: 'shawndrost',
      text: 'trololo',
      roomname: '4chan'
    };
    // create a message element
    var $message = $(`<div>${message.username}: ${message.text}</div>`);
    // insert to page
    $('#chats').append($message);
  },
  // render messages from specfic room
  renderRoom: function() {
    
  }
};

app.init();