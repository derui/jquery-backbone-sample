/**
 * それぞれのTODOに対するビューを定義する
 */

var Backbone = require('backbone');
var _ = require('underscore');
var moment = require('moment');

module.exports = Backbone.View.extend({
  className : 'small-12 large-12 columns todo__content',

  template: require('tmpl/todoRow'),

  events : {
    'click .finished__current-state' : 'onFinishedChange',
    'click .todo__delete__button' : 'onDeleteClick'
  },

  /**
   * 完了スイッチが操作された時のイベントハンドラ
   * @method onFinishedClick
   */
  onFinishedChange: function() {
    
  },

  /**
   * 削除ボタンが押された時のイベントハンドラ
   * @method onDeleteClick
   */
  onDeleteClick: function() {
    
  },

  render: function() {
    this.$el.empty().append(this.template(_.exnted({}, this.model.attributes, {
      limitDate : moment(this.model.get('limitDate')).format('YYYY/MM/DD HH:MM')
    })));

    this.$('.finished__current-state').prop('checked', this.model.isFinished());

    return this;
  }
});
