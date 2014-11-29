

var Backbone = require('backbone');
var TodoView = require('./todo-view');

module.exports = Backbone.View.extend({
  className: 'todo row display',

  initialize: function() {
    // collectionの読み込みが完了したら再レンダリングする。
    this.listenTo(this.collection, 'remove sync', this.render);
    this.listenTo(this.collection, 'add', this.handleAdd);
  },

  /**
   * modelがcollectionに追加された時のイベントハンドラ。
   *
   * @method addTodo
   * @private
   * @param {Models.Todo} model Collectionに追加されたmodel
   */
  handleAdd : function(model) {
    // viewの生成時に、initialAnimationを有効にする
    var view = new TodoView({
      model: model,
      initialAnimation: true
    });
    this.$el.append(view.render().$el);
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
