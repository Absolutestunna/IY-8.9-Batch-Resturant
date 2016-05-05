var React = require('react');
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
var RecipeList = React.createClass({
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
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="nav">
                <h3>MAD CITY RECIPIES</h3>
                <div className="nav-right">

                <span onClick={this.handleAdd}className="dropdown">
                  <i  className="fa fa-plus fa-2x"></i>
                  <div className="dropdown-content" >
                    <p  id='add-recipe'>Add Recipe</p>
                  </div>
                </span>

                  <i className="fa fa-cog fa-2x"></i>
                  <span className="dropdown">
                    <i className="fa fa-user fa-2x"></i>
                    <div className="dropdown-content" >
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
            <div className="col-md-12">

              <RecipeListComponent handleFinalPageActivate={this.handleFinalPageActivate}/>

            </div>
          </div>
        </div>
      </div>
    );
  }
});


var RecipeListComponent = React.createClass({
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
          <div key={data.objectId} onClick={this.props.handleFinalPageActivate} id={data.objectId} className="col-xs-12 col-md-3 each" >
            <h2>{data.name}</h2><br />
            <p>{data.cook}</p>
         </div>

        );
    }.bind(this));
    return (
      <div className="row">
        <div className="col-md-12 myList">
          <h3>My Recipies</h3>
          {eachItem}
        </div>
      </div>
    );
  }
});

module.exports = RecipeList;
