// YOUR CODE HERE:

// $.get('https://api.parse.com/1/classes/chatterbox');

$(document).ready(function(){
  var apiURL = 'https://api.parse.com/1/classes/chatterbox';
  var messages;
  var text;

  var aj = $.ajax({
    url: apiURL,
    type: 'GET',
    dataType: 'JSON',
    success: function(data) {
      messages = data.results;
      console.log(messages);
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].text) {
          text = messages[i].text;
          $(".chat").append("<p>" + text + "</p>");
        }
      };

      console.log("expect isArray to be true", Array.isArray(messages));
    },
    error: function(data) {
      console.error('Failed to get message');
    }
  });
});