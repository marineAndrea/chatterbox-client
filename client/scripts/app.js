var app = {};
app.server = 'https://api.parse.com/1/classes/chatterbox';
app.rooms = [];

app.init = function(){
  this.getAll();
}

app.send = function(newData){
  $.ajax({
    url: this.server,
    type: 'POST',
    data: JSON.stringify(newData),
    contentType: 'application/json',
    success: function (data) {
      alert('chatterbox: Message sent');
    },
    error: function (data) {
      alert('chatterbox: Failed to send message');
    }
  });
  return;
}

app.fetch = function(){
  this.getAll();
  return;
}

app.clearMessages = function(){
  $('#chats').empty();
  return;
}

app.addMessage = function(message){
  text = message.text;
  username = message.username;
  $newMessage = $('<div></div>');
  $newMessage.text(username + ": " + text);
  $("#chats").append($newMessage);
  return;
}

app.addRoom = function(room){
  $newRoom = $('<option></option>')
    .attr('value', room)
    .text(room);
  $('#roomSelect').append($newRoom);
  return;
}

app.addFriend = function() {
  return;
}

app.handleSubmit = function() {
  return;
}

//EVENT HANDLERS
$(document).ready(function(){
  app.init();
  $("#submit").on("click", function() {
    var newData = {};
    newData.username = window.location.search.slice(10); // .split("=")[1]
    newData.text = $("#message").val();
    newData.roomname = $("#room").val();
    app.send(newData);
  });
});

//METHODS
app.getAll = function(){
  $.ajax({
    url: this.server,
    type: 'GET',
    dataType: 'JSON',
    success: function(data) {
      var messages = data.results;
      console.log(messages);
      for (var i = 0; i < messages.length; i++) {
        app.rooms.push(messages[i].roomname);
        text = messages[i].text;
        username = messages[i].username;
        $newMessage = $('<div></div>');
        $newMessage.text(username + ": " + text);
        $("#chats").append($newMessage);
      }
    },
    error: function(data) {
      console.error('Failed to get message');
    }
  });
}

/*app.getRoomMessages = function(room) {
  $.ajax({
    url: this.server,
    type: 'GET',
    dataType: 'JSON',
    room = room || "";
    success: function(data) {
      var messages = data.results;
      console.log(messages);
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].roomname === room) {
          text = messages[i].text;
          username = messages[i].username;
          $newMessage = $('<div></div>');
          $newMessage.text(username + ": " + text + ": " + room);
          $("#chats").append($newMessage);
        }
      }
    },
    error: function(data) {
      console.error('Failed to get message');
    }
  });
  return;
}*/