/**
 * それぞれのTODOに対するビューを定義する
 */

var Marionette = require('backbone.marionette');
var _ = require('underscore');
var moment = require('moment');

module.exports = Marionette.ItemView.extend({
  className : 'small-12 large-12 columns todo__content',

  template: require('tmpl/todoRow'),

  ui: {
    finished : '.finished__current-state',
    del: '.todo__delete__button',
    overlay: '.todo__content__overlay'
  },

  events : {
    'click @ui.finished' : 'onFinishedChange',
    'click @del' : 'onDeleteClick'
  },

  /**
   * overlayをトグルする
   * @method _toggleOverlay
   * @private
   */
  _toggleOverlay : function() {
    'use strict';
    this.ui.overlay.toggleClass('is-active');
  },

  /**
   * 完了スイッチが操作された時のイベントハンドラ
   * @method onFinishedClick
   */
  onFinishedChange: function() {
    'use strict';
    var throttle = _.throttle(_.bind(this._toggleOverlay, this), 500);

    // リクエストの開始、終了、エラー時にそれぞれトグルするようにする
    this.listenToOnce(this.model, 'sync request error', throttle);

    this.model.save({finished : !this.model.get('finished')});
  },

  /**
   * アニメーションと自身の削除を行う
   * @method _animateAndRemove
   * @private
   */
  _animateAndRemove: function() {
    'use strict';
    this.$el.slideUp(200).fadeOut(200, function() {
      this.remove();
    }.bind(this));
  },

  /**
   * 削除ボタンの有効と無効を切り替える
   * @method _toggleDeleteButton
   * @private
   */
  _toggleDeleteButton: function() {
    'use strict';
    this.ui.del.prop('disabled', this.ui.del.prop('disabled'));
  },

  /**
   * 削除ボタンが押された時のイベントハンドラ
   * @method onDeleteClick
   */
  onDeleteClick: function() {
    'use strict';
    if (this.ui.del.prop('disabled')) {
      return;
    }

    // modelをdestoryし、正常に終了したら自身も削除する
    this.listenToOnce(this.model, 'sync', this._animateAndRemove);
    this.listenToOnce(this.model, 'request error', this._toggleDeleteButton);
    this.model.destroy();
  },

  templateHelpers: {
    showLimitDate: function() {
      if (this.limitDate) {
        return moment(this.model.get('limitDate')).format('YYYY/MM/DD HH:MM');
      } else {
        return 'No limit';
      }
    }
  },

  onRender: function() {
    'use strict';

    if (this.options.initialAnimation) {
      this.$el.hide();
    }

    this.ui.finished.prop('checked', this.model.isFinished());

    if (this.options.initialAnimation) {
      this.$el.slideDown(200);
    }
  }
});
