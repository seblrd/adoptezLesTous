import React from "react";
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import API from "../../utils/API";
export class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
    hasError: false
  };
  send = async () => {
    const { email, password } = this.state;
    this.state.hasError = true
    try {
      const { data } = await API.login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);
      localStorage.setItem("admin", data.admin);
      localStorage.setItem("connected", true);
      window.location = "/";
    } catch (error) {
      this.state.hasError = true;
      this.state.errorMessage = error.response.data.error;
    }
    if(this.state.hasError === true){
      alert(this.state.errorMessage)
    }
    console.log(this.state.hasError)
  };
  dispErr = ()=>{
    return(
      alert('bug')
    )
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { email, password } = this.state;
    return (      
      <div>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button onClick={this.send} block bsSize="large" type="submit">
            Connexion
          </Button>
      </div>
    );
  }
}