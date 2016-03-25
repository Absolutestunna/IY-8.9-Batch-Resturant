var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var Backbone = require('backbone');

var RecipeListComponent = React.createClass({displayName: "RecipeListComponent",
  handleReciepeList: function(){
    Backbone.history.navigate('recipeList', {trigger: true});
  },
  handleLogOut: function(e){
    e.preventDefault()
    console.log("logout")
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
                    React.createElement("i", {onClick: this.handleLogOut, className: "fa fa-user fa-2x"})
                  )
                )
              )
            )
        ), 

        React.createElement("div", {className: "recipeInfo"}, 
            React.createElement("div", {className: "recipe-pic"}, 
              React.createElement("i", {onClick: this.handleAdd, className: "fa fa-plus fa-3x"})
            ), 
            React.createElement("form", {className: "form-group recipe-info"}, 
                React.createElement("input", {name: "text", className: "form-control", id: "recipe-name", type: "text", placeholder: "Recipe Name"}), React.createElement("br", null), 
                React.createElement("input", {name: "text", className: "form-control", id: "baker-name", type: "text", placeholder: "By"}), React.createElement("br", null)
            ), 
            React.createElement("form", {className: "form-group recipe-ingredients"}, 
              React.createElement("select", {className: "form-control selectpicker recipe-type"}, 
                React.createElement("option", null, "Breakfast"), 
                React.createElement("option", null, "Lunch"), 
                React.createElement("option", null, "Dinner"), 
                React.createElement("option", null, "Dessert")

              ), 

              React.createElement("input", {name: "text", className: "form-control", id: "prep-time", type: "text", placeholder: "Prep Time"}), 
              React.createElement("input", {name: "text", className: "form-control", id: "cook-time", type: "text", placeholder: "Cook Time"}), 
              React.createElement("input", {name: "text", className: "form-control", id: "cook-temp", type: "text", placeholder: "Cook Temp"}), 

              React.createElement("select", {className: "form-control selectpicker temperature"}, 
                React.createElement("option", null, "C"), 
                React.createElement("option", null, "F")
              )

            ), 

            React.createElement("div", {className: "serving-info"}, 
              React.createElement(ServingIngredients, null), 
              React.createElement("textarea", {rows: "6", className: "form-control", placeholder: "What directions go with this step?"}), 
              React.createElement("button", {className: "btn btn-secondary add"}, "Add another step")
            ), 
            React.createElement("div", {className: "save"}, 
              React.createElement("button", {onClick: this.handleReciepeList, className: "btn btn-success"}, "Save the recipe")
            )

        )


     )
    );
  }
});

var ServingIngredients = React.createClass({displayName: "ServingIngredients",
  render: function(){
    return (
      React.createElement("div", null, 
          React.createElement("form", {className: "form-group"}, 
            React.createElement("input", {name: "text", className: "form-control", id: "amount", type: "number", placeholder: "Amount"}), 
              React.createElement("select", {className: "form-control selectpicker units"}, 
                React.createElement("option", null, "cup(s)"), 
                React.createElement("option", null, "lb"), 
                React.createElement("option", null, "Tb")
              ), 
            React.createElement("input", {name: "text", className: "form-control", id: "ingredient", type: "text", placeholder: "Ingredient"}), 
            React.createElement("button", {className: "btn btn-default", id: ""}, React.createElement("i", {className: "fa fa-plus fa-2x"}))
        )
    )
    );
  }
});

module.exports = RecipeListComponent;