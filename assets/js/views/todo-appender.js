
var Backbone = require('backbone');
var Todo = require('app/models/todo');

module.exports = Backboen.View.extend({
  className: 'todo-appender row collapse',

  template: require('tmpl/appender.html'),

  initialize: function() {
    this.refreshTodo();
  },

  events: {
    'change .todo__append__date' : 'onDateChange',
    'change .todo__append__content' : 'onContentChange',
    'click .todo__append__submit' : 'onAppendClick'
  },

  /**
   * 日付が変更された時のイベントハンドラ
   * @method onDateChange
   * @private
   */
  onDateChange: function() {
    var $date = this.$('.todo__append__date');

    this.model.set('limitDate', $date.val());
  },

  /**
   * 内容が変更された時のイベントハンドラ
   * @method onContentChange
   * @private
   */
  onContentChange: function() {
    var $content = this.$('.todo__append__content');

    this.model.set('content', $content.val());
  },

  /**
   * 追加ボタンがクリックされた時のイベントハンドラ
   * @method onAppendClick
   * @private
   */
  onAppendClick: function() {
    this.listenToOnce(this.model, 'sync', function() {
      this.collection.add(this.model);

      this.refreshTodo();
    }, this);

    this.model.save({});
  },

  refreshTodo : function() {
    var todo = new Todo();
    this._unbindEvents();

    this.model = todo;
    this._bindEvents();
  },

  _unbindEvents : function() {
    this.stopListening(this.model);
  },

  _bindEvents : function() {
    this.listenTo(this.model, 'change'. this.handleChange);
  },

  handleChange : function() {
    this.$('.todo__append__content').val(this.model.get('content'));
    this.$('.todo__append__date').val(this.model.get('limitDate'));
  },

  render: function() {
    this.$el.empty().append(this.template());

    return this;
  }
});
