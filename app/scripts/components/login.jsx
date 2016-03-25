var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var Backbone = require('backbone');
require('backbone-react-component');


Parse.initialize("tiy-gvl");
Parse.serverURL = 'http://batch-cookies.herokuapp.com/';

var LoginComponent = React.createClass({
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
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="header">WELCOME TO MAD CITY BAKERY</h1>
          </div>
           <div className="row">
             <SignUpComponent handleSignUp={this.handleSignUp} />
             <SignInComponent handleSignIn={this.handleSignIn} />
            </div>
        </div>

    </div>
    );
  }
});

var SignUpComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    return (
      <div className="col-md-6">
        <h3>Hello New Baker? Sign up here if you don't have an account</h3>
        <form id="signup" className="form-signup">
          <input name="email" className="form-control" id="email" type="email" placeholder="Email" /><br/>
          <input name="text" className="form-control" id="username" type="text" placeholder="Username" /><br/>
          <input name="password" className="form-control"id="password" type="password" placeholder="Password" /><br/>
          <input id="sign-up" onClick={this.props.handleSignUp} type="submit" className="form-control btn btn-primary" value="Sign Up" />
        </form>
        <div className="error"></div>
      </div>
    )
  }
});

var SignInComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    return (
      <div className="col-md-6">
        <h3>Already have an Account?</h3>
        <h5>Sign In here!</h5>
        <form id="login" className="form-signin">
          <input name="text" className="form-control" id="username1" type="text" placeholder="Username" /><br/>
          <input name="password" className="form-control" id="password1" type="password" placeholder="Password" /><br/>
          <input onClick={this.props.handleSignIn} className="form-control btn btn-primary" type="submit"  value="Sign In" />
        </form>
        <div id="error"></div>

      </div>
    );
  }
});

module.exports = LoginComponent;
