/**
 * それぞれのTODOに対するビューを定義する
 */

var Backbone = require('backbone');

module.exports = Backbone.View.extend({
  className : 'small-12 large-12 columns todo__content',

  template: require('tmpl/todoRow'),

  events : {
  },

  render: function() {
    this.$el.empty().append(this.template(this.model.attributes));

    return this;
  }
});
