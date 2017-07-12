import React from 'react';
import AuthStore from '../stores/AuthStore.js';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  //getInitialState
  getInitialState() {
    return {
      error: null,
      loggingIn: false
    };
  },

  //componentWillMount
  componentWillMount() {},

  //handleSubmit
  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      error: null,
      loggingIn: true
    });

    var username = this.refs.inputUsername.value;
    var pass = this.refs.inputPassword.value;
    //console.log('DEBUG: username = ' + username + ' and pass = ' + pass);

    AuthStore.login(username, pass).then(function() {
      // redirect the user to the query builder
      window.location = '#/';
    }.bind(this), function(message) {
      this.setState({
        error: message,
        loggingIn: false
      });
    }.bind(this));
  },

  //render
  render() {
    return (
      <div className='login'>
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h2 className="form-signin-heading">DCGS Query Builder</h2>
          <h4 className="form-signin-framework">(ReactJS)</h4>
          <label htmlFor="inputUsername" className="sr-only">Username</label>
          <input id="inputUsername" ref="inputUsername" className="form-control" placeholder="Username"/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" ref="inputPassword" id="inputPassword" className="form-control" placeholder="Password"/>
          <div className="checkbox">
            <label>
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div>
          {this.state.loggingIn && (
            <div className="spinner"></div>
          )}
          {!this.state.loggingIn && (
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          )}
          {this.state.error && (
            <p className="error">{this.state.error}</p>
          )}
        </form>
      </div>
    )
  }
});