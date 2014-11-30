/**
 * Todoリソースの単一オブジェクトを表す
 */

var Backbone = require('backbone');
var moment = require('moment');
var Api = require('app/utils/api-util');
var _ = require('underscore');

module.exports = Backbone.Model.extend({
  defaults: {
    id: null,
    content: '',
    limitDate : null,
    finished: false
  },

  idAttribute: 'id',
  urlRoot : Api.getApi('todo'),

  toJSON: function() {
    'use strict';
    var attrs = this.clone().attributes;

    if (attrs.limitDate) {
      attrs.limitDate = moment(attrs.limitDate).toISOString();
    }
    return attrs;
  },

  /**
   * このTODOが完了しているかどうかを返す
   * @method isFinished
   * @return {Boolean} 完了しているかどうか
   */
  isFinished: function() {
    'use strict';
    return !!this.get('finished');
  },

  validate: function() {
    'use strict';
    if (!this.get('content') || _.isString(this.get('content'))) {
      return 'Content must contain valid string';
    }
    return undefined;
  }
});
