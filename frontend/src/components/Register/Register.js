import React from "react";
import {Button, FormGroup, FormControl, FormLabel} from "../../../node_modules/react-bootstrap";
import API from "../../utils/API";

export class Register extends React.Component {
  state = {
    email: "",
    password: "",
    cpassword: "",
    username: "",
    errorMessage:''
  };
  send = async () => {
    const { email, password, cpassword, username } = this.state;
    if (!email || email.length === 0) return;
    if (!password || password.length === 0 || password !== cpassword) return;
    try {
      const { data } = await API.register({ email, password, username });
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);
      localStorage.setItem("admin", data.admin);
      localStorage.setItem("connected", true);
      window.location = "/";
    } catch (error) {
      alert( error.response.data.error)
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { email, password, cpassword, username } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <FormGroup controlId="email" size="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" size="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="cpassword" size="large">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            value={cpassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="username" size="large">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            value={username}
            onChange={this.handleChange}
            type="string"
          />
        </FormGroup>
        <Button onClick={this.send} block size="large" type="submit">
          Inscription
        </Button>
      </div>
    );
  }
}