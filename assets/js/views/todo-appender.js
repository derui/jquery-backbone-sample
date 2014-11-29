
var Backbone = require('backbone');
var Todo = require('app/models/todo');

module.exports = Backboen.View.extend({
  className: 'todo-appender row collapse',

  template: require('tmpl/appender.html'),

  events: {
    'click .todo__append__submit' : 'onAppendClick'
  },

  /**
   * 追加ボタンがクリックされた時のイベントハンドラ
   * @method onAppendClick
   * @private
   */
  onAppendClick: function() {
    
  },

  render: function() {
    this.$el.empty().append(this.template());

    return this;
  }
});
