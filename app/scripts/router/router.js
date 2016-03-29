var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var LoginPageComponent = require('./../components/login.jsx');
var RecipeAddComponent = require('./../components/recipeAdd.jsx');
var RecipeListComponent = require('./../components/recipeList.jsx');
var FinalDisplay = require('./../components/recipeInformation.jsx');


var Router = Backbone.Router.extend({
  routes: {
    '': 'login',
    'recipeList': 'recipeList',
    'finalRecipe': 'finalRecipe',
    'finalDisplay': 'finalDisplay'
  },
  login: function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));

    ReactDOM.render(
      React.createElement(LoginPageComponent), document.getElementById('app')
    );
  },
  recipeList: function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    ReactDOM.render(
      React.createElement(RecipeListComponent), document.getElementById('app')
    );
  },
  finalRecipe: function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));

    ReactDOM.render(
      React.createElement(RecipeAddComponent), document.getElementById('app')
    );
  },
  finalDisplay: function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));

    ReactDOM.render(
      React.createElement(FinalDisplay), document.getElementById('app')
    );
  }
});

module.exports = Router;
