var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var Backbone = require('backbone');

var RecipeList = React.createClass({displayName: "RecipeList",
  handleAdd: function(e){
    e.preventDefault()
    Backbone.history.navigate('finalRecipe', {trigger: 'true'});
  },
  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "container-fluid"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-md-12"}, 
              React.createElement("div", {className: "nav"}, 
                React.createElement("h3", null, "MAD CITY RECIPIES"), 
                React.createElement("div", {className: "nav-right"}, 
                  React.createElement("i", {onClick: this.handleAdd, className: "fa fa-plus fa-2x"}), 
                  React.createElement("i", {className: "fa fa-cog fa-2x"}), 
                  React.createElement("i", {className: "fa fa-user fa-2x"})
                )
              )
            )
          )
        ), 
        React.createElement("div", {className: "container"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-md-12 listItems ", id: "main-Page"}, 
              React.createElement(RecipeListComponent, {handleAdd: this.handleAdd})
            )
          )
        )
      )
    );
  }
});

var RecipeListComponent = React.createClass({displayName: "RecipeListComponent",
  
  render: function(){
    return (
      React.createElement("div", {className: "recipeList row"}, 
        React.createElement(NewRecipeButtonComponent, {handleAdd: this.props.handleAdd}), 
        React.createElement(NewRecipeButtonComponent, {handleAdd: this.props.handleAdd}), 
        React.createElement(NewRecipeButtonComponent, {handleAdd: this.props.handleAdd}), 
        React.createElement(NewRecipeButtonComponent, {handleAdd: this.props.handleAdd})
      )
    );
  }
});

var NewRecipeButtonComponent = React.createClass({displayName: "NewRecipeButtonComponent",
  render: function(){
    return (
      React.createElement("div", {className: "col-md-3"}, 
        React.createElement("div", {onClick: this.props.handleAdd, className: "eachItem"}, 
          React.createElement("i", {className: "fa fa-plus fa-3x"}), 
          React.createElement("p", null, "Add to Order")
        )
      )
    );
  }
});

module.exports = RecipeList;