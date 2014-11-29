/**
 * Todoリソースに対するコレクション
 */

var Backbone = require('backbone');
var Model = require('app/models/todo');
var Api = require('app/utils/api-util');

module.exports = Backbone.Collection.extend({
  model: Model,

  url: Api.getApi('todo')
});
