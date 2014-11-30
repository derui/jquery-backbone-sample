var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Collection = require('app/collections/todos');
var TodosView = require('app/views/todos-view');
var Appender = require('app/views/todo-appender');

$(function() {
  'use strict';
  var collection = new Collection();
  var appender = new Appender({
    collection: collection
  });
  var todos = new TodosView({
    collection: collection
  });

  $('.todo-appender--placeholder').append(appender.render().$el);

  $('.todo-list').append(todos.render().$el);

  collection.fetch();
});
