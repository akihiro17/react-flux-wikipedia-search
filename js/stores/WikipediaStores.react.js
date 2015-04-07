var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/Constants');
var assign = require('object-assign');
var Constants = require('../constants/Constants');

var CHANGE_EVENT = 'change';

var _term;
var _results = [];

var WikipediaStore = assign({}, EventEmitter.prototype, {
    getResults: function () {
        return _results;
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var text;

    switch(action.actionType) {
    case Constants.SEARCH:
        _term = action.term;
        _results = action.results;
        break;
    }

    WikipediaStore.emitChange();
    return true;
});

module.exports = WikipediaStore;
