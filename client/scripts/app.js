var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  // will be run on page load
  init: function() {
    console.log('This page is ready!'); 
    this.fetch();
  },
  //send message to server
  send: function(message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(message),
      success: function(res) {
        setTimeout(app.fetch,250);
      },
      error: function(res) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  //get message from server
  fetch: function() {
    $.ajax({
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      data: 'order=-createdAt',
      success: function (data) {
        console.log('chatterbox: data received', data);
        app.renderMessages(data.results);
      },
      error: function (data) {
        console.error('chatterbox: Failed to fetch messages', data);
      }
    });
  },
  // clear messages on chat
  clearMessages: function() {
    
  },
  // When called, shoul add message to page, accepts a message obj
  renderMessage: function(message) {
    var escapedText = this.escapeHtml(message.text);
    var escapedUsername = this.escapeHtml(message.username);   
    // create a message element
    var $message = $(`<div>${escapedUsername}: ${escapedText}, ${message.createdAt}</div>`);
    // insert to page
    $('#chats').append($message);
  },
  // renders each message from an array of messages
  renderMessages: function(messages) {
    // for each message in messages invoke renderMessage
    messages.forEach(message => {
      this.renderMessage(message);
    });
  },
  // render messages from specfic room
  renderRoom: function() {   
  },
  // accepts a string, returns escaped string
  escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  },
  // accepts an escaped string, returns unescaped string
  unescapeHtml(escapedStr) {
    var div = document.createElement('div');
    div.innerHTML = escapedStr;
    var child = div.childNodes[0];
    return child ? child.nodeValue : '';
  }
};

app.init();

