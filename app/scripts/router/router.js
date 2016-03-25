var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var LoginPageComponent = require('./../components/login.jsx');
var RecipeAddComponent = require('./../components/recipeAdd.jsx');
var RecipeListComponent = require('./../components/recipeList.jsx');


var Router = Backbone.Router.extend({
  routes: {
    '': 'login',
    'recipeList': 'recipeList',
    'finalRecipe': 'finalRecipe'
  },
  login: function(){
    ReactDOM.render(
      React.createElement(LoginPageComponent), document.getElementById('app')
    );
  },
  recipeList: function(){
    ReactDOM.render(
      React.createElement(RecipeListComponent), document.getElementById('app')
    );
  },
  finalRecipe: function(){
    ReactDOM.render(
      React.createElement(RecipeAddComponent), document.getElementById('app')
    );
  }
});

module.exports = Router;