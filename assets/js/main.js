var $ = require('jquery');

var showAlert = require('./show-alert');

$(function() {
  'use strict';
  var $appender = $('.todo-appender');

  // TODOを追加するイベントをバインド
  $appender.on('click', '.todo__append__submit', function() {
    var $content = $appender.find('.todo__append__content');
    var $date = $appender.find('.todo__append__date');

    var data = {};

    if (!$content.val()) {
      var $alert = showAlert({
        text: 'TODOの内容は必須です',
        onClose: function() {
          $alert.remove();
        }
      });

      $content.parent().append($alert);
    }

    
  });
});
