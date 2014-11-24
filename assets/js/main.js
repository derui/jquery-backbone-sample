var $ = require('jquery');
var _ = require('underscore');

var showAlert = require('./show-alert');
var api = require('./api.js');
var makeRow = require('./make-row');

$(function() {
  'use strict';
  var $appender = $('.todo-appender');

  api.getAll('todo').done(function(response) {
    _.each(response, makeRow);
  });

  // TODOを追加するイベントをバインド
  $appender.on('click', '.todo__append__submit', function() {
    var $content = $appender.find('.todo__append__content');
    var $date = $appender.find('.todo__append__date');
    var $button = $(this);

    var data = {
      finished: false
    };

    if (!$content.val()) {
      var $alert = showAlert({
        text: 'TODOの内容は必須です',
        onClose: function() {
          $alert.remove();
        }
      });

      $content.parent().append($alert);
      return;
    }

    data.content = $content.val();
    if ($date.val()) {
      data.limitDate = new Date($date.val()).toISOString();
    }

    $date.val('');
    $content.val('');

    $content.prop('disabled', true);
    $date.prop('disabled', true);
    $button.prop('disabled', true);

    // 新しい行を追加する。
    api.post('todo', data).then(function(args) {
      _.delay(function() {
        $content.prop('disabled', false);
        $date.prop('disabled', false);
        $button.prop('disabled', false);
      }, 500);

      return $.Deferred().resolve(args);
    }).done(makeRow);
  });
});
