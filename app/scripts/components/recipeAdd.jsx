var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var Backbone = require('backbone');

var RecipeListComponent = React.createClass({
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
                    <i className="fa fa-user fa-2x"></i>
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

        </div>


     </div>
    );
  }
});

module.exports = RecipeListComponent;
