

var Marionette = require('backbone.marionette');
var TodoView = require('./todo-view');

module.exports = Marionette.CollectionView.extend({
  className: 'todo row display',
  childView : TodoView,

  initialize: function() {
    'use strict';

    // collectionの読み込みが完了したら再レンダリングする。
    this.listenToOnce(this.collection, 'sync', this.render);
  }
});
