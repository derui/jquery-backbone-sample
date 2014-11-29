

var Backbone = require('backbone');
var TodoView = require('./todo-view');

module.exports = Backbone.View.extend({
  className: 'todo row display',

  initialize: function() {
    // collectionの読み込みが完了したら再レンダリングする。
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    this.$el.empty();

    // collectionにあるmodelをそれぞれViewとしてレンダリングする
    this.collection.each(function(model) {
      var view = new TodoView({
        model : model
      });

      this.$el.append(view.render().$el);
    }, this);

    return this;
  }
});
