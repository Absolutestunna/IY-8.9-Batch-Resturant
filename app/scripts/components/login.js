var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var Backbone = require('backbone');

// {/*parse Parse.User.login method goes here serialize and capture username and password*/
/**/
// }

Parse.initialize("tiygvl");
Parse.serverURL = 'http://batch-cookies.herokuapp.com/';

var LoginComponent = React.createClass({displayName: "LoginComponent",
  handleSignUp: function(e){
    e.preventDefault();
    console.log("signup")
    var user = new Parse.User();
    user.set({'username': $('#username').val(), 'email': $('#email').val(), 'password': $('#password').val()});
    user.signUp(null, {
      'success': function(results){
        console.log("results: ", results);
      },
      'error': function(user, error){
        console.log(user, error);
      }
    });
  },
  handleSignIn: function(e){
    e.preventDefault();
    Backbone.history.navigate('recipeList', {trigger: true});
  },
  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-md-12"}, 
            React.createElement("h1", {className: "header"}, "WELCOME TO MAD CITY BAKERY")
          ), 
           React.createElement("div", {className: "row"}, 
             React.createElement(SignUpComponent, {handleSignUp: this.handleSignUp}), 
             React.createElement(SignInComponent, {handleSignIn: this.handleSignIn})
            )
        )

    )
    );
  }
});

var SignUpComponent = React.createClass({displayName: "SignUpComponent",
  render: function(){
    return (
      React.createElement("div", {className: "col-md-6"}, 
        React.createElement("h3", null, "Hello New Baker? Sign up here if you don't have an account"), 
        React.createElement("form", {id: "signup", className: "form-signup"}, 
          React.createElement("input", {name: "email", className: "form-control", id: "email", type: "email", placeholder: "Email"}), React.createElement("br", null), 
          React.createElement("input", {name: "text", className: "form-control", id: "username", type: "text", placeholder: "Username"}), React.createElement("br", null), 
          React.createElement("input", {name: "password", className: "form-control", id: "password", type: "password", placeholder: "Password"}), React.createElement("br", null), 
          React.createElement("input", {onClick: this.props.handleSignUp, type: "submit", className: "form-control btn btn-primary", value: "Sign Up"})
        )
      )
    )
  }
});

var SignInComponent = React.createClass({displayName: "SignInComponent",
  render: function(){
    return (
      React.createElement("div", {className: "col-md-6"}, 
        React.createElement("h3", null, "Already have an Account?"), 
        React.createElement("h5", null, "Sign In here!"), 
        React.createElement("form", {id: "login", className: "form-signin"}, 
          React.createElement("input", {name: "email", className: "form-control", id: "email", type: "email", placeholder: "Email"}), React.createElement("br", null), 
          React.createElement("input", {name: "password", className: "form-control", id: "password", type: "password", placeholder: "Password"}), React.createElement("br", null), 
          React.createElement("input", {onClick: this.props.handleSignIn, className: "form-control btn btn-primary", type: "submit", value: "Sign In"})
        )
      )
    );
  }
});

module.exports = LoginComponent;