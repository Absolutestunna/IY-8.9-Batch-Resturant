var Backbone = require('backbone');
var $ = require('jquery');


var Router = require('./router/router');

var realRouter = new Router();
$(function(){
  Backbone.history.start();
});
