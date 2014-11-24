var $ = require('jquery');
var moment = require('moment');
var _ = require('underscore');

var api = require('./api');
  
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

module.exports = function(data) {
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

