
var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.View.extend({
  className : 'alert-box',

  template: require('tmpl/show-alert.html'),

  events : {
    'click .close' : function() {
      if (this.onClose) {
        this.onClose();
      }
    }
  },

  initialize: function(param) {
    this.listenTo(this.model, 'invalid', this.handleInvalid);

    this.type = (param && param.type) || 'warning';
    this.text = '';
  },

  handleInvalid: function(model, error) {
    this.text = error;

    this.render().$el.show();
  },

  setModel : function(model) {
    this.stopListening(this.model);
    this.model = model;

    return this;
  },

  /**
   * 強制的に表示させる
   *
   * @method show
   * @return {Views.Alert}
   */
  show: function() {
    this.$el.show();

    return this;
  },

  /**
   * 強制的に表示を閉じる
   *
   * @method hide
   * @return {Views.Alert}
   */
  hide: function() {
    this.$el.hide();

    return this;
  },

  render : function() {
    this.$el.empty().append(this.template({text : this.text}));

    this.$el.addClass(this.type);

    return this;
  }
});
