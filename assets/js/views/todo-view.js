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

    if (this.$('.todo__delete__button').prop('disabled')) {
      return;
    }

    // リクエストの開始時点でオーバーレイをトグルする
    this.model.once('request error', function() {
      this.$('.todo__content__overlay').toggleClass('is-active');
    }, this);

    // リクエストが完了したらオーバーレイを非表示にする
    this.model.once('sync', function() {
      _.delay(function() {
        this.$('.todo__content__overlay').toggleClass('is-active');
      }, 500, this);
    }, this);

    this.model.save({finished : !this.model.get('finished')});
  },

  /**
   * 削除ボタンが押された時のイベントハンドラ
   * @method onDeleteClick
   */
  onDeleteClick: function() {
    // modelをdestoryし、正常に終了したら自身も削除する
    this.model.once('sync', function() {
      this.$el.slideUp(200).fadeOut(200, this.remove.bind(this));
    }, this);
    
    this.model.destroy();
  },

  render: function() {
    this.$el.empty().append(this.template(_.exnted({}, this.model.attributes, {
      limitDate : moment(this.model.get('limitDate')).format('YYYY/MM/DD HH:MM')
    })));

    this.$('.finished__current-state').prop('checked', this.model.isFinished());

    return this;
  }
});
