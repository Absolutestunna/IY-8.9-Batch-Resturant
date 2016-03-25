var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var Backbone = require('backbone');

var RecipeList = React.createClass({
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
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="nav">
                <h3>MAD CITY RECIPIES</h3>
                <div className="nav-right">
                  <i onClick={this.handleAdd} className="fa fa-plus fa-2x"></i>
                  <i className="fa fa-cog fa-2x"></i>
                  <span>
                    <i onClick={this.handleLogOut} className="fa fa-user fa-2x"></i>
                    <p id='logout'>Logout</p>
                  </span>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 listItems " id='main-Page'>
              <RecipeListComponent handleAdd={this.handleAdd} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var RecipeListComponent = React.createClass({

  render: function(){
    return (
      <div className="recipeList row">
        <NewRecipeButtonComponent handleAdd={this.props.handleAdd} />
        <NewRecipeButtonComponent handleAdd={this.props.handleAdd} />
        <NewRecipeButtonComponent handleAdd={this.props.handleAdd} />
        <NewRecipeButtonComponent handleAdd={this.props.handleAdd} />
      </div>
    );
  }
});

var NewRecipeButtonComponent = React.createClass({
  render: function(){
    return (
      <div className="col-md-3">
        <div onClick={this.props.handleAdd} className="eachItem">
          <i className="fa fa-plus fa-3x"></i>
          <p>Add to Order</p>
        </div>
      </div>
    );
  }
});

module.exports = RecipeList;
