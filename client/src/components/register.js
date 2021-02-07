import React, { Component } from "react";
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeComfirmPassword = this.onChangeComfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      comfirmPassword: "",
    };
  }
  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }
  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
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
  onChangeComfirmPassword(e) {
    this.setState({
      comfirmPassword: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      comfirmPassword: this.state.comfirmPassword,
    };
    console.log(user);
    axios
      .post("http://localhost:8000/api/user/register", user)
      .then((res) => console.log(res.data));

    window.location = "/menu";
  }
  render() {
    return (
      <div>
        <h4>Register</h4>
        <form onSubmit={this.onSubmit}>
          <div className="form-group row">
            <label htmlFor="firstName" className="col-sm-2 col-form-label">
              First Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={this.state.firstName}
                onChange={this.onChangeFirstName}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lastName" className="col-sm-2 col-form-label">
              Last Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={this.state.lastName}
                onChange={this.onChangeLastName}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="comfirmPassword"
              className="col-sm-2 col-form-label"
            >
              Comfirm Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                value={this.state.comfirmPassword}
                onChange={this.onChangeComfirmPassword}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
