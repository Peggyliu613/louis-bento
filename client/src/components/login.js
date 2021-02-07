import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          email: "",
          password: "",

        };
      }
      onChangeEmail(e) {
        this.setState({
          email: e.target.value,
        });
      }
      onChangePassword(e) {
        this.setState({
          password: e.target.value,
        });
    }
    
      onSubmit(e) {
        e.preventDefault();
        const user = {
          email: this.state.email,
          password: this.state.password,
        };
        console.log(user);
        axios
          .post('/api/user/login', user)
          .then((res) => console.log(res.data));
    
        window.location = "/new";
      }
  render() {
    return (
      <div className="container">
          <br/>
          <br/>
          <br/>
        <form className="form-signin" onSubmit={this.onSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
          <label for="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Email address"
            required
            value={this.state.email}
                onChange={this.onChangeEmail}
          />
          <label for="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            value={this.state.password}
                onChange={this.onChangePassword}
          />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
