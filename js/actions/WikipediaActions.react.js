var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var WikipediaActions = {
    search: function(term) {
        $.ajax({
      url: 'http://ja.wikipedia.org/w/api.php?&callback=JSON_CALLBACK',
      jsonp: 'callback',
      dataType: 'jsonp',
      data: {
        action: 'opensearch',
        search: term,
        format: 'json'
      }
    })
    .done(function(msg) {
      AppDispatcher.dispatch({
        actionType: Constants.SEARCH,
        term: term,
        results: msg[1]
      });
    });
  }
};

module.exports = WikipediaActions;
