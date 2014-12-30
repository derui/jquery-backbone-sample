
var Marionette = require('backbone.marionette');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
  className : 'alert-box',

  template: require('tmpl/show-alert.html'),
  ui: {
    close : '.close'
  },

  events : {
    'click @ui.close' : function() {
      'use strict';
      this.hide();
      if (this.onClose) {
        this.onClose();
      }
    }
  },

  modelEvents: {
    'validated': 'render'
  },

  templateHelpers: function() {
    var self = this;
    return {
      showErrorText: function() {
        var validated = this.model.validationError;

        if (validated && validated.length > 0) {
          return _.values(validated).join('<br>');
        }
        return '';
      }
    };
  },

  onRender : function() {
    'use strict';
    this.$el.addClass(this.type);

    if (this.model.isValid()) {
      this.$el.hide();
    } else {
      this.$el.show();
    }
  }
});
