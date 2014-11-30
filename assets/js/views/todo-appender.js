
var Backbone = require('backbone');
var Todo = require('app/models/todo');
var Alert = require('./alert');

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'todo-appender row collapse',

  template: require('tmpl/appender.html'),

  initialize: function() {
    'use strict';
    this.refreshTodo();

    this._alert = new Alert({
      type: 'warning',
      model : this.model
    });
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
    'use strict';
    var $date = this.$('.todo__append__date');

    this.model.set('limitDate', $date.val());
  },

  /**
   * 内容が変更された時のイベントハンドラ
   * @method onContentChange
   * @private
   */
  onContentChange: function() {
    'use strict';
    var $content = this.$('.todo__append__content');

    this.model.set('content', $content.val());
  },

  /**
   * 追加ボタンがクリックされた時のイベントハンドラ
   * @method onAppendClick
   * @private
   */
  onAppendClick: function() {
    'use strict';
    if (this.$('.todo__append__button').prop('disabled')) {
      return;
    }

    this._alert.hide();

    this.listenToOnce(this.model, 'sync', function() {
      this.collection.add(this.model);

      this.refreshTodo();
    }, this);

    this.model.save({});
  },

  disable : function() {
    'use strict';
    this._setAllElementDisabled(true);
  },

  enable : function() {
    'use strict';
    this._setAllElementDisabled(false);
  },

  _setAllElementDisabled: function(disabled) {
    'use strict';
    this.$('.todo__append__button').prop('disabled', disabled);
    this.$('.todo__append__content').prop('disabled', disabled);
    this.$('.todo__append__date').prop('disabled', disabled);
  },

  refreshTodo : function() {
    'use strict';
    var todo = new Todo();
    this._unbindEvents();

    this.model = todo;
    this._bindEvents();
  },

  _unbindEvents : function() {
    'use strict';
    this.stopListening(this.model);
  },

  _bindEvents : function() {
    'use strict';
    this.listenTo(this.model, 'change', this.handleChange);
    this.listenTo(this.model, 'request', this.disable);
    this.listenTo(this.model, 'error sync', this.enable);
  },

  handleChange : function() {
    'use strict';
    this.$('.todo__append__content').val(this.model.get('content'));
    this.$('.todo__append__date').val(this.model.get('limitDate'));
  },

  render: function() {
    'use strict';
    this.$el.empty().append(this.template());

    this.$('.todo__append__content--alert').append(this._alert.render().$el.hide());

    return this;
  }
});
