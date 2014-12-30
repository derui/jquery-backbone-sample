
var Marionette = require('backbone.marionette');
var Todo = require('app/models/todo');
var Alert = require('./alert');
var _ = require('underscore');

module.exports = Marionette.LayoutView.extend({
  tagName: 'div',
  className: 'todo-appender row collapse',

  template: require('tmpl/appender.html'),

  regions : {
    alert: '.todo__append__content--alert'
  },

  ui :{
    date: '.todo__append__date',
    content :'.todo__append__content',
    submit: '.todo__append__submit'
  },

  events: {
    'change @ui.date' : 'onDateChange',
    'change @ui.content' : 'onContentChange',
    'click @ui.submit' : 'onAppendClick'
  },

  modelEvents : {
    'change': 'handleChange',
    'request': 'disable',
    'error sync': 'enable'
  },

  /**
   * 日付が変更された時のイベントハンドラ
   * @method onDateChange
   * @private
   */
  onDateChange: function() {
    'use strict';
    this.model.set('limitDate', this.ui.date.val());
  },

  /**
   * 内容が変更された時のイベントハンドラ
   * @method onContentChange
   * @private
   */
  onContentChange: function() {
    'use strict';
    this.model.set('content', this.ui.content.val());
  },

  /**
   * 追加ボタンがクリックされた時のイベントハンドラ
   * @method onAppendClick
   * @private
   */
  onAppendClick: function() {
    'use strict';
    if (this.ui.submit.prop('disabled')) {
      return;
    }

    if (!this.model.isValid(true)) {
      return;
    }

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
    _.values(this.ui, function($v) {
      $v.prop('disabled', disabled);
    });
  },

  refreshTodo : function() {
    'use strict';
    var todo = new Todo();
    this.stopListening(this.model);
    this.model = todo;
    this.bindEntityEvents();
  },

  handleChange : function() {
    'use strict';
    this.ui.content.val(this.model.get('content'));
    this.ui.date.val(this.model.get('limitDate'));
  },

  onRender: function() {
    'use strict';
    this.getRegion('alert').show(new Alert({
      type: 'warning',
      model: this.model
    }));
  }
});
