var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Collection = require('app/collections/todos');
var TodosView = require('app/views/todos-view');
var Appender = require('app/views/todo-appender');

$(function() {
  'use strict';
  var appender = new Appender();
  var collection = new Collection();
  var todos = new TodosView({
    collection: collection
  });

  $('.todo-appender--placeholder').append(appender.render().$el);

  $('.todo-list').append(todos.render().$el);

  collection.fetch();
});
