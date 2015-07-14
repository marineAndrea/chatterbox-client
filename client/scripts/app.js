var app = {};
window.initialized = false;
app.server = 'https://api.parse.com/1/classes/chatterbox';

app.init = function(room) {
  // window.roomname;
  var text;
  var username;
  var $newMessage;
  room = room || "";
  alert("inside init" + room);
  // debugger;

  $.ajax({
    url: this.server,
    type: 'GET',
    dataType: 'JSON',

    success: function(data) {
      var messages = data.results;
      console.log(messages); //[{}, {} ...]
      // go through the messages in the appropriate room and display the ones that correspond
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].roomname === room) {
          text = messages[i].text;
          username = messages[i].username;
          $newMessage = $('<div></div>'); // why is this working?
          $newMessage.text(username + ": " + text + ": " + room);
          $(".chat").append($newMessage);
        }
      }
    },
    error: function(data) {
      console.error('Failed to get message');
    }
  });
};


app.send = function(newData) {
  $.ajax({
    url: this.server,
    type: 'POST',
    data: JSON.stringify(newData),
    contentType: 'application/json',
    success: function (data) {
      alert('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      alert('chatterbox: Failed to send message');
    }
  });
  // refresh each time message is sent
  alert(newData.roomname);
  this.fetch(newData.roomname);
  return;
};

app.fetch = function(room) { 
  $('.chat').empty();
  this.init(room);
  return;
};

$(document).ready(function(){
  $("#submit").on("click", function() {
    var newData = {};
    newData.username = window.location.search.slice(10); // .split("=")[1]
    newData.text = $("#message").val();
    newData.roomname = $("#room").val();
    app.send(newData);
  });
  if (!window.initialized) {
    alert("called init at bottom" + window.initialized);
    window.initialized = true;
    app.init();
  }
});




