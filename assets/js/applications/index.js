var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var IndexRouter = require('app/routers/index');

var MyApp = new Marionette.Application();

MyApp.addRegions({
  appender: '.todo-appender--placeholder',
  list : '.todo-list'
});

MyApp.addInitializer(function() {
  'use strict';
  new IndexRouter();
  Backbone.history.start();
});

module.exports = MyApp;
