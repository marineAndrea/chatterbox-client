// YOUR CODE HERE:

// $.get('https://api.parse.com/1/classes/chatterbox');

$(document).ready(function(){
  var apiURL = 'https://api.parse.com/1/classes/chatterbox';
  var messages;
  var text;
  var displayMessages = function() {
    $('.chat').empty();
    $.ajax({
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
        }
      },
      error: function(data) {
        console.error('Failed to get message');
      }
    });
  };
  displayMessages();
  // debugger;
  $('.refresh').on('click', function(event){
    displayMessages();
  });


});