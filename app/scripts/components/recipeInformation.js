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

var FinalDisplay = React.createClass({displayName: "FinalDisplay",
  handleLogOut: function(e){
    e.preventDefault();
    Parse.User.logOut().then(() => {
      var currentUser = Parse.User.current();  // this will now be null
    });
  },
  render: function(){
    return(
      React.createElement("div", null, 
        React.createElement("div", {className: "container-fluid"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-md-12"}, 
              React.createElement("div", {className: "nav"}, 
                React.createElement("h3", null, "MAD CITY RECIPIES"), 
                React.createElement("div", {className: "nav-right"}, 
                  React.createElement("i", {className: "fa fa-plus fa-2x"}), 
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
          )

        )
    );
  }
});

module.exports = FinalDisplay;