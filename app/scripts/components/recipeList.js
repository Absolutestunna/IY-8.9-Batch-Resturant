var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var Backbone = require('backbone');


//  Parse.User.current().fetch().done(function(user){
  //   console.log(user)
  // })
// var recipeAdd = require('./recipeAdd.jsx');
// console.log(recipeID)
// Backbone.history.navigate('finalDisplay', {trigger: 'true'});
// for (var i = 0; i < results.length; i++) {
//   var object = results[i];
//   alert(object.id + ' - ' + object.get('playerName'));
// }
$(function(){
  Parse.initialize("tiy-gvl");
  Parse.serverURL = 'http://batch-cookies.herokuapp.com/';
});
var RecipeList = React.createClass({displayName: "RecipeList",
  handleFinalPageActivate: function(e){
    e.preventDefault();
    var Recipies = Parse.Object.extend("Recipies");
    var query = new Parse.Query(Recipies);


    query.select("cook", "name")
    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var recipeName = object.toJSON().name;
          var recipeCook = object.toJSON().cook;

        }
      }
  });

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
                  React.createElement("i", {onClick: this.handleAdd, className: "fa fa-plus fa-2x"}), 
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
            React.createElement("div", {className: "col-md-12 listItems ", id: "main-Page"}, 
              React.createElement(NewRecipeButtonComponent, {
                handleFinalPageActivate: this.handleFinalPageActivate, 
                handleAdd: this.handleAdd}
                )
            )
          ), 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-md-12"}, 

              React.createElement(RecipeListComponent, null)

            )
          )
        )
      )
    );
  }
});


var NewRecipeButtonComponent = React.createClass({displayName: "NewRecipeButtonComponent",
  render: function(){
    return (
      React.createElement("div", {className: "recipeList row"}, 

        React.createElement("div", {className: "col-md-3"}, 
          React.createElement("div", {onClick: this.props.handleAdd, className: "eachItem"}, 
            React.createElement("i", {className: "fa fa-plus fa-3x"}), 
            React.createElement("p", null, "Add to Order")
          )
        ), 
        React.createElement("button", {onClick: this.props.handleFinalPageActivate, className: "btn btn-default finalPage"}, "+")

    )

    );
  }
});

var RecipeListComponent = React.createClass({displayName: "RecipeListComponent",
  render: function(){
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-md-3 myList"}

        )
      )
    );
  }
});

module.exports = RecipeList;