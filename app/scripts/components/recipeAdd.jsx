var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var Backbone = require('backbone');

var RecipeListComponent = React.createClass({
  handleReciepeList: function(){
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
                    <i onClick={this.handleLogOut} className="fa fa-user fa-2x"></i>
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

            <div className="serving-info">
              <ServingIngredients />
              <textarea rows="6" className="form-control" placeholder="What directions go with this step?"></textarea>
              <button className="btn btn-secondary add">Add another step</button>
            </div>
            <div className="save">
              <button onClick={this.handleReciepeList} className="btn btn-success">Save the recipe</button>
            </div>

        </div>


     </div>
    );
  }
});

var ServingIngredients = React.createClass({
  render: function(){
    return (
      <div>
          <form className="form-group">
            <input name="text" className="form-control" id="amount" type="number" placeholder="Amount" />
              <select className="form-control selectpicker units">
                <option>cup(s)</option>
                <option>lb</option>
                <option>Tb</option>
              </select>
            <input name="text" className="form-control" id="ingredient" type="text" placeholder="Ingredient" />
            <button className="btn btn-default" id=""><i className="fa fa-plus fa-2x"></i></button>
        </form>
    </div>
    );
  }
});

module.exports = RecipeListComponent;
