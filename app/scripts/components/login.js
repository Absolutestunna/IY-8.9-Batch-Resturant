var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var Backbone = require('backbone');
require('backbone-react-component');


Parse.initialize("tiy-gvl");
Parse.serverURL = 'http://batch-cookies.herokuapp.com/';

var LoginComponent = React.createClass({displayName: "LoginComponent",
  mixins: [Backbone.React.Component.mixin],
  handleSignUp: function(e){
    e.preventDefault();
    console.log("signup")
    var user = new Parse.User();
    user.set({'username': $('#username').val(), 'email': $('#email').val(), 'password': $('#password').val()});
    user.signUp(null, {
      'success': function(results){
        console.log("results: ", results);
        Backbone.history.navigate("home", {trigger: true});
      },
      'error': function(user, error){
        $('.error').html('<p>' + "* " + error.message + '</p>');
        console.log(user, error);
      }
    });
  },
  handleSignIn: function(e){
    e.preventDefault();
    var username = $('#username1').val();
    var password = $('#password1').val();
    console.log(username, password)
    Parse.User.logIn(username, password, {
      success: function(user) {
        console.log(user);
        console.log("Hello ",  user);
        Backbone.history.navigate("recipeList", {trigger: true});
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        console.log(error);
        $('#error').html('<p>' + "* " + error.message + '</p>');

      }
     });
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
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    return (
      React.createElement("div", {className: "col-md-6"}, 
        React.createElement("h3", null, "Hello New Baker? Sign up here if you don't have an account"), 
        React.createElement("form", {id: "signup", className: "form-signup"}, 
          React.createElement("input", {name: "email", className: "form-control", id: "email", type: "email", placeholder: "Email"}), React.createElement("br", null), 
          React.createElement("input", {name: "text", className: "form-control", id: "username", type: "text", placeholder: "Username"}), React.createElement("br", null), 
          React.createElement("input", {name: "password", className: "form-control", id: "password", type: "password", placeholder: "Password"}), React.createElement("br", null), 
          React.createElement("input", {id: "sign-up", onClick: this.props.handleSignUp, type: "submit", className: "form-control btn btn-primary", value: "Sign Up"})
        ), 
        React.createElement("div", {className: "error"})
      )
    )
  }
});

var SignInComponent = React.createClass({displayName: "SignInComponent",
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    return (
      React.createElement("div", {className: "col-md-6"}, 
        React.createElement("h3", null, "Already have an Account?"), 
        React.createElement("h5", null, "Sign In here!"), 
        React.createElement("form", {id: "login", className: "form-signin"}, 
          React.createElement("input", {name: "text", className: "form-control", id: "username1", type: "text", placeholder: "Username"}), React.createElement("br", null), 
          React.createElement("input", {name: "password", className: "form-control", id: "password1", type: "password", placeholder: "Password"}), React.createElement("br", null), 
          React.createElement("input", {onClick: this.props.handleSignIn, className: "form-control btn btn-primary", type: "submit", value: "Sign In"})
        ), 
        React.createElement("div", {id: "error"})

      )
    );
  }
});

module.exports = LoginComponent;