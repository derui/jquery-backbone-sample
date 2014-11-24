var $ = require('jquery');
var moment = require('moment');
var _ = require('underscore');

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
  $row.data(data);

  $('.todo').prepend($row.hide());
  $row.slideDown();
};
