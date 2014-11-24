
var $ = require('jquery');
var _ = require('underscore');

var alertTmpl = require('tmpl/show-alert');

/**
 * alertBoxを生成する。
 * @param {String} text 表示するテキスト。HTMLでも表示可能
 * @param {String} [type] 表示する種別
 * @param {Function} [onClose] 閉じるときに発行されるコールバック
 */
module.exports = function(options) {
  'use strict';
  var defaultOptions = {
    type : 'warning',
    text : '',
    onClose : null
  };

  var merged = _.extend(defaultOptions, options);
  var $alertBox = $(alertTmpl(merged));

  if (_.isFunction(merged.onClose)) {
    $alertBox.on('click', '.close', merged.onClose);
  }

  return $alertBox;
};
