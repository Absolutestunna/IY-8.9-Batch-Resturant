var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var Backbone = require('backbone');
require('react-dom');

// var query = new Parse.Query(RecipeInfo);
// query.equalTo("chef", username);
// query.find({
//   success: function(results) {
//     console.log("Successfully retrieved " + results.length + " recipies.")
//     for (var i = 0; i < results.length; i++) {
//       var object = results[i];
//       console.log(object.id + ' - ' + object.get('ingredient_author'));
// }
//   },
//   error: function(error) {
//     console.log("Error: " + error.code + " " + error.message);
//   }
// });

var RecipeListComponent = React.createClass({displayName: "RecipeListComponent",
  getInitialState: function(){
    return {
      items: [],
      ingredients: ""
    }
  },
  handleIngredientCapture: function(number, name, ingredientUnit, e){
    var itemsConcat = this.state.items.concat([
      {'id': Date.now(), ingredients: number + " " + name + " " + ingredientUnit }
    ])
    this.setState({items: itemsConcat, ingredients: ""});
  },
  handleLogOut: function(e){
    e.preventDefault();
    Parse.User.logOut().then(() => {
      var currentUser = Parse.User.current();  // this will now be null
    });
    Backbone.history.navigate('', {trigger: 'true'});

  },
  handleReciepeList: function(){
    var ingredient_name = $('#recipe-name').val();
    var ingredient_author = $('#baker-name').val();
    var mealTimes = $('.recipe-type option:selected').text();
    var prepTime = $('#prep-time').val();
    var cookTime = $('#cook-time').val();
    var cookTemp = $('#cook-temp').val();
    var tempUnit = $('.temperature option:selected').text();
    var username = Parse.User.current();
    var directions = $('#directions-step').val();
    var recipeID;

    var RecipeInfo = Parse.Object.extend("Recipies");
    var info = new RecipeInfo();

    var basic_info = {
      'cook_id': username,
      'cook': ingredient_author,
      'name': ingredient_name
    };
    info.set(basic_info);
    var items = this.state.items;
    info.save(null, {
      success: function(info) {
        console.log('New object created with objectId: ' + info.id);
        recipeID = info.id;
        var RecipeIngredients = Parse.Object.extend("Ingredients");
        var ingredients = new RecipeIngredients();
        var recipe_info = {
          'mealTimes': mealTimes,
          'prepTime': prepTime,
          'cookTime': cookTime,
          'cookTemp': cookTemp,
          'tempUnit': tempUnit,
          'ingredients': items,
          'directions': directions,
          'recipe': info
        };
        ingredients.set(recipe_info);

        ingredients.save(null, {
          success: function(info) {
            console.log('New object created with objectId: ' + info.id);

          },
          error: function(info, error) {
            console.log('Failed to create new object, with error code: ' + error.message);
            }
        });

      },
      error: function(info, error) {
        console.log('Failed to create new object, with error code: ' + error.message);
        }
    });


  Backbone.history.navigate('recipeList', {trigger: true});

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

            React.createElement(RecipeStepsComponent, {
              items: this.state.items, 
              handleIngredientCapture: this.handleIngredientCapture}
              ), 

            React.createElement("div", {className: "save"}, 
              React.createElement("button", {onClick: this.handleReciepeList, className: "btn btn-success"}, "Save the recipe")
            )

        )


     )
    );
  }
});
var RecipeStepsComponent = React.createClass({displayName: "RecipeStepsComponent",

  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "serving-info"}, 

          React.createElement(ServingIngredients, {
            items: this.props.items, 
            handleIngredientCapture: this.props.handleIngredientCapture}
            ), 
          React.createElement("textarea", {id: "directions-step", rows: "6", className: "form-control", placeholder: "What are the directions for this awesome recipe?"})
        )
      )
    );
  }
});

var ServingIngredients = React.createClass({displayName: "ServingIngredients",
  onCapture: function(e){
    e.preventDefault();
    var amountNumber = ReactDOM.findDOMNode(this.refs.amount).value;
    var ingredient = ReactDOM.findDOMNode(this.refs.ingredient).value;
    var unit = $('.units option:selected').text();
    if (amountNumber == ""){
      alert('please provide an ingredient amount')
    } else if (ingredient == ""){
      alert('please provide an ingredient item')
    } else {
      $('#individualIngredient').append('<div class="ingredientItems"><ul><li>' + amountNumber + " " + unit + " " + ingredient + '</li></ul></div>');
      this.props.handleIngredientCapture(amountNumber, unit, ingredient)
      ReactDOM.findDOMNode(this.refs.amount).value = '';
      ReactDOM.findDOMNode(this.refs.ingredient).value = '';
    }
  },
  render: function(){
    return (
      React.createElement("div", null, 
          React.createElement("form", {className: "form-group", id: "individualIngredient"}, 
            React.createElement("input", {ref: "amount", name: "text", className: "form-control", id: "amount", type: "number", placeholder: "Amount"}), 
              React.createElement("select", {className: "form-control units"}, 
                React.createElement("option", null, "cup(s)"), 
                React.createElement("option", null, "oz"), 
                React.createElement("option", null, "tb(s)")
              ), 
            React.createElement("input", {ref: "ingredient", name: "text", className: "form-control", id: "ingredient", type: "text", placeholder: "Ingredient"}), 
            React.createElement("button", {onClick: this.onCapture, className: "btn btn-default", id: "addIngredient"}, React.createElement("i", {className: "fa fa-plus fa-2x"}))
        )
    )
    );
  }
});

module.exports = RecipeListComponent;