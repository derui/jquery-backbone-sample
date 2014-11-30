
var Backbone = require('backbone');

module.exports = Backbone.View.extend({
  className : 'alert-box',

  template: require('tmpl/show-alert.html'),

  events : {
    'click .close' : function() {
      'use strict';
      this.hide();
      if (this.onClose) {
        this.onClose();
      }
    }
  },

  initialize: function(param) {
    'use strict';
    this.listenTo(this.model, 'invalid', this.handleInvalid);

    this.type = (param && param.type) || 'warning';
    this.text = '';
  },

  handleInvalid: function(model, error) {
    'use strict';
    this.text = error;

    this.render().$el.show();
  },

  setModel : function(model) {
    'use strict';
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
    'use strict';
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
    'use strict';
    this.$el.hide();

    return this;
  },

  render : function() {
    'use strict';
    this.$el.empty().append(this.template({text : this.text}));

    this.$el.addClass(this.type);

    return this;
  }
});
