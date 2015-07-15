var app = {};
app.server = 'https://api.parse.com/1/classes/chatterbox';
app.rooms = {};
app.friends = {};

app.init = function(){
  $.ajax({
    url: this.server,
    type: 'GET',
    dataType: 'JSON',
    success: function(data) {
      var messages = data.results;
      console.log(messages);
      for (var i = 0; i < messages.length; i++) {
        if (!(messages[i].roomname in app.rooms)) {
          app.rooms[messages[i].roomname] = true;
          app.addRoom(messages[i].roomname);
        }
        app.addMessage(messages[i]);
      }
    },
    error: function(data) {
      console.error('Failed to get message');
    }
  });
}

app.send = function(newData){
  $.ajax({
    url: this.server,
    type: 'POST',
    data: JSON.stringify(newData),
    contentType: 'application/json',
    success: function (data) {
      app.fetch();
      alert('chatterbox: Message sent');
    },
    error: function (data) {
      alert('chatterbox: Failed to send message');
    }
  });
  return;
}

app.fetch = function(){
  app.clearMessages();
  app.init();
  return;
}

app.clearMessages = function(){
  $('#chats').empty();
  return;
}

app.addMessage = function(message){
  var text = message.text;
  var username = message.username;
  $user = $('<button></button>');
  $user.attr({
    'name': username,
    'class': 'username'
    }); // does it escape?
  $user.text(username);
  $content = $('<p></p>');
  $content.text(text); // escaping content
  $newMessage = $('<div></div>');
  if (username in app.friends) {
    $newMessage.addClass('friend');
  }
  $newMessage.append($user);
  $newMessage.append($content);
  $("#chats").append($newMessage);
  return;
}

app.addRoom = function(room){
  $newRoom = $('<option></option>')
    .attr('value', room) // does it escape?
    .text(room);
  $('#roomSelect').append($newRoom);
  return;
}

app.addFriend = function(username) {
  if (!(username in app.friends)) {
    app.friends[username] = true;
    console.log(this.friends);

  }
  app.fetch();
  return;
}

app.handleSubmit = function(data) {
    app.send(data);
  return;
}

// Document.init
$(document).ready(function(){
  app.init();
  // event send handler
  $("#send").on("click", function() {
    var newData = {};
    newData.username = window.location.search.slice(10); // .split("=")[1]
    newData.text = $("#message").val();
    newData.roomname = $("#room").val();
    app.handleSubmit(newData);
  });
  //event add friend
  $('#chats').on('click', '.username', function() {
    app.addFriend($(this).text());
  });
  //event handler select username
  $('#roomSelect').on('change', function() {
    var newRoom = $(this).val();
    console.log("roomSelect value " + newRoom);
    app.getRoomMessages(newRoom);
  });
});

app.getRoomMessages = function(room) {
  $.ajax({
    url: this.server,
    type: 'GET',
    dataType: 'JSON',
    success: function(data) {
      var messages = data.results;
      console.log(messages);
      app.clearMessages();
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].roomname === room) {
        app.addMessage(messages[i]);
        }
      }
    },
    error: function(data) {
      console.error('Failed to get message');
    }
  });
};