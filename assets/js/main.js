var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var App = require('app/applications/index');

$(function() {
  'use strict';
  App.start();
});
