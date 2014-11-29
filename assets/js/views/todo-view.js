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

  initialize: function(param) {
    /**
     * 初期表示時のアニメーションを行うかどうか
     * @property _initialAnimation
     * @type Boolean
     */
    this._initialAnimation = (param && param.initialAnimation) || false;
  },

  /**
   * overlayをトグルする
   * @method _toggleOverlay
   * @private
   */
  _toggleOverlay : function() {
    this.$('.todo__content__overlay').toggleClass('is-active');
  },

  /**
   * 完了スイッチが操作された時のイベントハンドラ
   * @method onFinishedClick
   */
  onFinishedChange: function() {

    // リクエストの開始時点でオーバーレイをトグルする
    this.listenToOnce(this.model, 'request error', this._toggleOverlay);

    // リクエストが完了したらオーバーレイを非表示にする
    this.model.once('sync', function() {
      _.delay(this._toggleOverlay, 500);
    }, this);

    this.model.save({finished : !this.model.get('finished')});
  },

  /**
   * アニメーションと自身の削除を行う
   * @method _animateAndRemove
   * @private
   */
  _animateAndRemove: function() {
    this.$el.slideUp(200).fadeOut(200, this.remove.bind(this));
  },

  /**
   * 削除ボタンの有効と無効を切り替える
   * @method _toggleDeleteButton
   * @private
   */
  _toggleDeleteButton: function() {
    var $button = this.$('.todo__delete__button');
    $button.prop('disabled', $button.prop('disabled'));
  },

  /**
   * 削除ボタンが押された時のイベントハンドラ
   * @method onDeleteClick
   */
  onDeleteClick: function() {
    if (this.$('.todo__delete__button').prop('disabled')) {
      return;
    }

    // modelをdestoryし、正常に終了したら自身も削除する
    this.listenToOnce(this.model, 'sync', this._animateAndRemove);
    this.listenToOnce(this.model, 'request error', this._toggleDeleteButton);
    this.model.destroy();
  },

  render: function() {
    var limitDate = this.model.get('limitDate');
    this.$el.empty();

    if (this._initialAnimation) {
      this.$el.hide();
    }

    if (limitDate) {
      limitDate = moment(this.model.get('limitDate')).format('YYYY/MM/DD HH:MM');
    } else {
      limitDate = 'No limit';
    }

    this.$el.append(this.template(_.exnted({}, this.model.attributes, {
      limitDate : limitDate
    })));

    this.$('.finished__current-state').prop('checked', this.model.isFinished());

    if (this._initialAnimation) {
      this.$el.slideDown(200);
    }

    return this;
  }
});
