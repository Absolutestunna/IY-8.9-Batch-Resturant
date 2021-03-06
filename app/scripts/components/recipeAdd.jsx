var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var Backbone = require('backbone');
require('react-dom');



var RecipeListComponent = React.createClass({
  getInitialState: function(){
    return {
      items: [],
      'number': 0,
      'name': '',
      'ingredientUnit': ''
    }
  },
  handleIngredientCapture: function(number, name, ingredientUnit){
    var itemsConcat = this.state.items.concat([
      {
        'id': Date.now(),
        'number': number,
        'name':name,
        'ingredientUnit': ingredientUnit
      }
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

    var items = this.state.items;
    var info = new RecipeInfo();

    var basic_info = {
      'cook_id': username,
      'cook': ingredient_author,
      'name': ingredient_name,
      'mealTimes': mealTimes,
      'prepTime': prepTime,
      'cookTime': cookTime,
      'cookTemp': cookTemp,
      'tempUnit': tempUnit,
      'directions': directions,
    };
    info.set(basic_info);
    info.save(null, {
      success: function(info) {
        console.log('New object created with objectId: ' + info.id);
        recipeID = info.id;

        for (var i=0; i<items.length; i++){
          var RecipeIngredients = Parse.Object.extend("Ingredients");
          var ingredients = new RecipeIngredients();
          var recipe_info = {
            'recipe': info,
            'number': items[i].number,
            'name': items[i].name,
            'unit': items[i].ingredientUnit
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
        }
      },
      error: function(info, error) {
        console.log('Failed to create new object, with error code: ' + error.message);
        }
    });
  Backbone.history.navigate('recipeList', {trigger: true});
  },
  render: function(){
    return (
      <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="nav">
                  <h3>MAD CITY RECIPIES</h3>
                  <div className="nav-right">
                    <i onClick={this.handleAdd} className="fa fa-plus fa-2x"></i>
                    <i className="fa fa-cog fa-2x"></i>
                      <span className="dropdown">
                        <i className="fa fa-user fa-2x"></i>
                        <div className="dropdown-content">
                          <p onClick={this.handleLogOut} id='logout'>Logout</p>
                        </div>
                      </span>

                  </div>
                </div>
              </div>
            </div>
        </div>

        <div className="recipeInfo">
            <div className="recipe-pic">
              <i onClick={this.handleAdd} className="fa fa-plus fa-3x"></i>
            </div>
            <form className="form-group recipe-info">
                <input name="text" className="form-control" id="recipe-name" type="text" placeholder="Recipe Name" /><br/>
                <input name="text" className="form-control" id="baker-name" type="text" placeholder="By" /><br/>
            </form>
            <form className="form-group recipe-ingredients">
              <select className="form-control selectpicker recipe-type">
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Dessert</option>
              </select>

              <input name="text" className="form-control" id="prep-time" type="text" placeholder="Prep Time" />
              <input name="text" className="form-control" id="cook-time" type="text" placeholder="Cook Time" />
              <input name="text" className="form-control" id="cook-temp" type="text" placeholder="Cook Temp" />

              <select className="form-control selectpicker temperature">
                <option>C</option>
                <option>F</option>
              </select>
            </form>

            <RecipeStepsComponent
              items = {this.state.items}
              handleIngredientCapture={this.handleIngredientCapture}
              />

            <div className="save">
              <button onClick={this.handleReciepeList} className="btn btn-success">Save the recipe</button>
            </div>

        </div>


     </div>
    );
  }
});
var RecipeStepsComponent = React.createClass({

  render: function(){

    return (
      <div>
        <div className="serving-info">
          <ServingIngredients
            items = {this.props.items}
            handleIngredientCapture={this.props.handleIngredientCapture}
            />
          <textarea id="directions-step" rows="6" className="form-control" placeholder="What are the directions for this awesome recipe?"></textarea>
        </div>
      </div>
    );
  }
});

var ServingIngredients = React.createClass({
  onCapture: function(e){
    e.preventDefault();
    var amountNumber = ReactDOM.findDOMNode(this.refs.amount).value;
    var ingredient = ReactDOM.findDOMNode(this.refs.ingredient).value;
    var unit = $('.units option:selected').text();
    if (amountNumber == ""){
      alert('please provide an ingredient amount');
    } else if (ingredient == ""){
      alert('please provide an ingredient item');
    } else if (amountNumber < 0){
      alert('please make sure the amount is greater than 0');
    } else {
      $('#individualIngredient').append('<div class="ingredientItems"><ul><li>' + amountNumber + " " + unit + " " + ingredient + '</li></ul></div>');
      this.props.handleIngredientCapture(amountNumber, unit, ingredient)
      ReactDOM.findDOMNode(this.refs.amount).value = '';
      ReactDOM.findDOMNode(this.refs.ingredient).value = '';
    }
  },
  render: function(){
    return (
      <div>
          <form className="form-group" id="individualIngredient">
            <input ref="amount" name="text" className="form-control" id="amount" type="number" placeholder="Amount" />
              <select className="form-control units">
                <option>cup(s)</option>
                <option>oz</option>
                <option>tb(s)</option>
              </select>
            <input ref="ingredient" name="text" className="form-control" id="ingredient" type="text" placeholder="Ingredient" />
            <button onClick={this.onCapture} className="btn btn-default" id="addIngredient"><i className="fa fa-plus fa-2x"></i></button>
        </form>
    </div>
    );
  }
});

module.exports = RecipeListComponent;
