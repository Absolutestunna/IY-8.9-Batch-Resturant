var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var Backbone = require('backbone');

// {/*parse Parse.User.login method goes here serialize and capture username and password*/
/**/
// }

Parse.initialize("tiygvl");
Parse.serverURL = 'http://tiny-parse-server.herokuapp.com/';

var LoginComponent = React.createClass({
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
  render: function(){
    return (
      <div className="col-md-6">
        <h3>Hello New Baker? Sign up here if you don't have an account</h3>
        <form id="signup" className="form-signup">
          <input name="email" className="form-control" id="email" type="email" placeholder="Email" /><br/>
          <input name="text" className="form-control" id="username" type="text" placeholder="Username" /><br/>
          <input name="password" className="form-control"id="password" type="password" placeholder="Password" /><br/>
          <input onClick={this.props.handleSignUp} type="submit" className="form-control btn btn-primary" value="Sign Up" />
        </form>
      </div>
    )
  }
});

var SignInComponent = React.createClass({
  render: function(){
    return (
      <div className="col-md-6">
        <h3>Already have an Account?</h3>
        <h5>Sign In here!</h5>
        <form id="login" className="form-signin">
          <input name="email" className="form-control" id="email" type="email" placeholder="Email" /><br/>
          <input name="password" className="form-control" id="password" type="password" placeholder="Password" /><br/>
          <input onClick={this.props.handleSignIn} className="form-control btn btn-primary" type="submit"  value="Sign In" />
        </form>
      </div>
    );
  }
});

module.exports = LoginComponent;
