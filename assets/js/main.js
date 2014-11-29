var $ = require('jquery');
var _ = require('underscore');

var apiRoot = 'http://localhost:3000/api';

function url(resource) {
  'use strict';
  return apiRoot + '/' + resource;
}

var api = {
  /**
   * 指定したリソースの全件を取得する
   * 
   * @param {String} resource 取得するリソース名
   * @returns {jQuery.Deferred} deferredオブジェクト
   */
  getAll : function(resource) {
    'use strict';
    return $.getJSON(url(resource));
  },

  /**
   * 指定したリソースに対してpostメソッドを実行する。
   * 
   * @param {String} resource post先のリソース名
   * @param {Object} data postするデータオブジェクト
   * @returns {jQuery.Deferred} deferredオブジェクト
   */
  post: function(resource, data) {
    'use strict';
    return $.ajax({
      type: 'POST',
      url : url(resource),
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType : 'json'
    });
  },
  
  /**
   * 指定したリソースに対してputメソッドを実行する。
   * 
   * @param {String} resource post先のリソース名
   * @param {String} id put対象のリソースid
   * @param {Object} data postするデータオブジェクト
   * @returns {jQuery.Deferred} deferredオブジェクト
   */
  put: function(resource, id, data) {
    'use strict';
    return $.ajax({
      type: 'PUT',
      url : url(resource) + '/' + id,
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType : 'json'
    });
  },

  /**
   * 指定したリソースのidに対してdeleteメソッドを実行する
   * 
   * @param {String} resource post先のリソース名
   * @param {String} id 削除するリソースのid
   * @returns {jQuery.Deferred} deferredオブジェクト
   */
  del: function(resource, id) {
    'use strict';
    return $.ajax({
      type: 'DELETE',
      url : url(resource) + '/' + id
    });
  }
};

var moment = require('moment');
  
function bindEvents($row) {
  $row.on('click', '.todo__delete__button', function() {
    var $this = $(this);
    var $item = $this.parents('.todo__content');
    var data = $item.data('data');

    if (!_.isObject(data)) {
      throw 'Illegal data contains!';
    }

    api.del('todo', data.id).done(function() {
      $item.slideUp(200).fadeOut(200, function() {
        $item.remove();
      });
    });
  });

  $row.on('change', '.finished__current-state', function() {
    var $this = $(this);
    var $parent = $this.parents('.todo__content');
    var data = $parent.data('data');

    data.finished = $this.prop('checked');

    $parent.find('.todo__content__overlay').toggleClass('is-active');
    
    api.put('todo', data.id, data).done(function(data) {
      $parent.data('data', data);

      _.delay(function() {
        $parent.find('.todo__content__overlay').toggleClass('is-active');
      }, 500);
      
    });
  });
}

function makeRow(data) {
  'use strict';

  var $row = $('.todo__content--template').clone();
  $row = $row.removeClass('todo__content--template').addClass('todo__content');

  var $content = $row.find('.todo__content__text');
  var $date = $row.find('.todo__content__limit-date');
  var $finished = $row.find('.finished__current-state');
  var id = _.uniqueId('finished_');

  $content.html(data.content);

  if (data.limitDate) {
    $date.text(moment(data.limitDate).format('YYYY/MM/DD HH:MM:SS'));
  } else {
    $date.text('No Limit');
  }

  $finished.prop('checked', !!data.finished);

  $finished.attr('id', id);
  $row.find('.todo__content__finished label').attr('for', id);
  $row.data('data', data);

  bindEvents($row);

  $('.todo').prepend($row.hide());
  $row.slideDown(200);
};

var alertTmpl = require('tmpl/show-alert');

/**
 * alertBoxを生成する。
 * @param {String} text 表示するテキスト。HTMLでも表示可能
 * @param {String} [type] 表示する種別
 * @param {Function} [onClose] 閉じるときに発行されるコールバック
 */
function showAlert(options) {
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
