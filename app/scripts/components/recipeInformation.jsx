var React = require('react');
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


// Backbone.history.navigate('', {trigger: 'true'});

var FinalDisplay = React.createClass({
  handleLogOut: function(e){
    e.preventDefault();
    Parse.User.logOut().then(() => {
      var currentUser = Parse.User.current();  // this will now be null
    });
  },
  render: function(){
    return(
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="nav">
                <h3>MAD CITY RECIPIES</h3>
                <div className="nav-right">
                  <i className="fa fa-plus fa-2x"></i>
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

        </div>
    );
  }
});

module.exports = FinalDisplay;
