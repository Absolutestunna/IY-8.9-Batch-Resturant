var React = require('react');
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
var RecipeList = React.createClass({
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
          console.log(recipeCook, recipeName)
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
        <div className="container">
          <div className="row">
            <div className="col-md-12 listItems " id='main-Page'>
              <NewRecipeButtonComponent
                handleFinalPageActivate={this.handleFinalPageActivate}
                handleAdd={this.handleAdd}
                />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">

              <RecipeListComponent />

            </div>
          </div>
        </div>
      </div>
    );
  }
});


var NewRecipeButtonComponent = React.createClass({
  render: function(){
    return (
      <div className="recipeList row">

        <div className="col-md-3">
          <div onClick={this.props.handleAdd} className="eachItem">
            <i className="fa fa-plus fa-3x"></i>
            <p>Add to Order</p>
          </div>
        </div>
        <button onClick={this.props.handleFinalPageActivate} className="btn btn-default finalPage">+</button>

    </div>

    );
  }
});

var RecipeListComponent = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="col-md-3 myList">

        </div>
      </div>
    );
  }
});

module.exports = RecipeList;
