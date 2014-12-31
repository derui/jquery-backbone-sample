var Marionette = require('backbone.marionette');
var IndexController = require('app/controllers/index');

module.exports = Marionette.AppRouter.extend({
  controller: new IndexController(),
  appRoutes: {
    '' : 'showIndex'
  }
});
