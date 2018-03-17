var app = {
  // capture username input from url
  username: window.location.search.slice(10),
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  messages: [],
  // will be run on page load  
  init: function() {
    // fetch, render, and add messages to roomlist
    app.fetch('order=-createdAt', app.onPageLoad);   
  },
  //send message to server
  send: function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(message),
      success: function(res) {
        setTimeout(app.fetch.bind(this), 500);
      },
      error: function(res) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  //get message from server
  fetch: function(query, callback) {
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      data: query,
      success: function (data) {
        console.log('chatterbox: data received', data);
        callback(data.results);
      },
      error: function (data) {
        console.error('chatterbox: Failed to fetch messages', data);
      }
    });
  },

  // clear messages on chat
  clearMessages: function() {
    $('#chats').empty();
  },
  // When called, should add message to page, accepts a message obj
  renderMessage: function(message) {
    var escapedText = app.escapeHtml(message.text);
    var escapedUsername = app.escapeHtml(message.username);
    var timeSince = moment(message.createdAt).fromNow();
    // create a message element
    var $message = $(`<div>${escapedUsername}: ${escapedText}, ${timeSince}</div>`);
    // insert to page
    $('#chats').append($message);
  },
  // renders each message from an array of messages
  renderMessages: function(messages) {
    app.clearMessages();
    // for each message in messages invoke renderMessage
    messages.forEach(message => {
      app.renderMessage(message);
    });
  },
  // render messages from specific room
  renderRoom: function(roomStr) {
    var query = `where={"roomname": "${roomStr}"}`;
    // fetches room messages
    app.fetch(query, function(messages) {
      //rerenders page with said methods
      app.renderMessages(messages);
    });
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
  },
  // accept data messages array, renders messages
  onPageLoad(messages) {
    app.renderMessages(messages);
    app.updateRoomList(messages);
  },
  //update rooms, accept array messages
  updateRoomList(messages) {
    // clear room list
    $('#roomselect').empty();
    // create a array, filter listname before escape
    var listName = [];
    messages.forEach(function(message) {
      if (!listName.includes(message.roomname)) {
        listName.push(message.roomname);
      }
    });
    // for each message
    listName.forEach(roomname => {
      // escape roomname
      var escapedRoom = app.escapeHtml(roomname);
      // create a option node
      var $room = $(`<option value="${escapedRoom}">${escapedRoom}</option>`);
      // append to select
      $('#roomselect').append($room);
    });
  }
};

app.init();


