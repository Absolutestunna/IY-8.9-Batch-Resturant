var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var Backbone = require('backbone');
var ParseReact = require('parse-react');
require('react-dom');

// localStorage.setItem('user', {
//   name: data.name,
//   cook: data.cook,
//   id: data.objectId
// })

$(function(){
  Parse.initialize("tiy-gvl");
  Parse.serverURL = 'http://batch-cookies.herokuapp.com/';
});
var RecipeList = React.createClass({displayName: "RecipeList",
  getInitialState: function(){
    return {
      items: [],
      recipeName: "",
      recipeCook: ""
    }
  },
  handleFinalPageActivate: function(e){
    e.preventDefault();
    localStorage.setItem('id', e.currentTarget.id)
    Backbone.history.navigate('finalDisplay', {trigger: 'true'});


  },
  handleAdd: function(e){
    e.preventDefault()
    Backbone.history.navigate('finalRecipe', {trigger: 'true'});
  },
  handleLogOut: function(e){
    e.preventDefault();
    Parse.User.logOut().then(() => {
      var currentUser = Parse.User.current();  // this will now be null
    });
    Backbone.history.navigate('', {trigger: 'true'});

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

                React.createElement("span", {onClick: this.handleAdd, className: "dropdown"}, 
                  React.createElement("i", {className: "fa fa-plus fa-2x"}), 
                  React.createElement("div", {className: "dropdown-content"}, 
                    React.createElement("p", {id: "add-recipe"}, "Add Recipe")
                  )
                ), 

                  React.createElement("i", {className: "fa fa-cog fa-2x"}), 
                  React.createElement("span", {className: "dropdown"}, 
                    React.createElement("i", {className: "fa fa-user fa-2x"}), 
                    React.createElement("div", {className: "dropdown-content"}, 
                      React.createElement("p", {onClick: this.handleLogOut, id: "logout"}, "Logout")
                    )
                  )

                )
              )
            )
          )
        ), 
        React.createElement("div", {className: "container"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-md-12"}, 

              React.createElement(RecipeListComponent, {handleFinalPageActivate: this.handleFinalPageActivate})

            )
          )
        )
      )
    );
  }
});


var RecipeListComponent = React.createClass({displayName: "RecipeListComponent",
  mixins: [ParseReact.Mixin], // Enable query subscriptions
  observe: function() {
    // Subscribe to all Recipe objects, ordered by creation date
    // The results will be available at this.data.recipes
    return {
      recipes: (new Parse.Query('Recipies')).descending('createdAt')
    };
  },
  render: function(){
    var eachItem = this.data.recipes.map(function(data){
  
      return (
          React.createElement("div", {key: data.objectId, onClick: this.props.handleFinalPageActivate, id: data.objectId, className: "col-xs-12 col-md-3 each"}, 
            React.createElement("h2", null, data.name), React.createElement("br", null), 
            React.createElement("p", null, data.cook)
         )

        );
    }.bind(this));
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-md-12 myList"}, 
          React.createElement("h3", null, "My Recipies"), 
          eachItem
        )
      )
    );
  }
});

module.exports = RecipeList;