var Marionette = require('backbone.marionette');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
  className : 'alert-box',

  template: require('tmpl/show-alert.html'),
  ui: {
    close : '.close'
  },

  events : {
    'click @ui.close' : 'onClose'
  },

  onClose: function() {
    'use strict';
    this.destroy();
  },

  templateHelpers: function() {
    'use strict';
    var self = this;
    return {
      showErrorText: function() {
        var validated = self.options.errors;

        if (!self.options.isValid) {
          console.log(_.values(validated).join('<br>'));
          return _.values(validated).join('<br>');
        }
        return '';
      }
    };
  },

  onRender : function() {
    'use strict';
    this.$el.addClass(this.type);

    if (this.options.isValid) {
      this.$el.hide();
    }
  }
});
