var Marionette = require('backbone.marionette');
var Collection = require('app/collections/todos');
var TodosView = require('app/views/todos-view');
var Appender = require('app/views/todo-appender');
var Todo = require('app/models/todo');

module.exports = Marionette.Controller.extend({
  showIndex : function() {
    'use strict';

    var collection = new Collection();
    var appender = new Appender({
      model: new Todo(),
      collection: collection
    });
    var todos = new TodosView({
      collection: collection
    });

    var App = require('app/applications/index');
    App.getRegion('appender').show(appender);
    App.getRegion('list').show(todos);
  }
});
