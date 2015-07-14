var app = {};

app.server = 'https://api.parse.com/1/classes/chatterbox';

app.init = function() {
  $.ajax({
    url: this.server,
    type: 'GET',
    dataType: 'JSON',
    success: function(data) {
      var messages = data.results;
      console.log(messages);
      var text;
      var username;
      var $newMessage;
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].text) {
          text = messages[i].text;
          username = messages[i].username;
          $newMessage = $('<div></div>'); // why is this working?
          $newMessage.text(username + ": " + text);
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
    // dataType: 'JSON',
    success: function (data) {
      alert('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      alert('chatterbox: Failed to send message');
    }
  });
  return;
};

app.fetch = function() { 
  $('.chat').empty();
  this.init();
  return;
};

app.init();
$(document).ready(function(){
  $("#submit").on("click", function() {
    var newData = {};
    newData.username = window.location.search.slice(10); // .split("=")[1]
    newData.text = $("#message").val();
    app.send(newData);
  });
});






