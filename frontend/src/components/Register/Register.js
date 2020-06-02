import React from "react";
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import API from "../../utils/API";

export class Register extends React.Component {
  state = {
    email: "",
    password: "",
    cpassword: "",
    username: "",
    errorMessage:'',
    phoneNumber:""
  };
  send = async () => {
    const { email, password, cpassword, username, phoneNumber } = this.state;
    try {
      if (!email || email.length === 0) throw new Error('Email format non valide ou Nul');
      if (!password || password.length === 0 || password !== cpassword) throw new Error('Mot de passe et sa confirmation non valide ou Nulle');
      if (!username || username.length === 0) throw new Error("Nom utilisateur Incorrect");
      if (!phoneNumber || phoneNumber.length != 10) throw new Error("Numéro de téléphone Incorrect");
      const { data } = await API.register({ email, password, cpassword, username, phoneNumber });
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);
      localStorage.setItem("admin", data.admin);
      localStorage.setItem("connected", true);
      alert('Compte crée')
      window.location = "/";
    } catch (error) {
      if(error.response.data.error._message === "User validation failed")
      {
        var err = '';
        var myErr = error.response.data.error.errors
        console.log(error.response.data.error.errors)
        if(myErr.email)
          err+=("Email deja utilisé \n")
        if(myErr.phoneNumber)
          err+=("Numéro de téléphone deja utilisé \n")
        if(myErr.username)
          err+=("Nom utilisateur deja utilisé \n")
          console.log(err)
          alert(err)
      }
      else{
        console.log(error.response.data.error)
        alert( error.response.data.error)
      }
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { email, password, cpassword, username, phoneNumber } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <FormGroup controlId="email" size="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={this.handleChange}
            placeholder="adoptezLesTous@alt.fr" 
          />
        </FormGroup>
        <FormGroup controlId="password" size="large">
          <FormLabel>Mot de Passe</FormLabel>
          <FormControl
            value={password}
            onChange={this.handleChange}
            type="password"
            placeholder="Mot de passe..." 
          />
        </FormGroup>
        <FormGroup controlId="cpassword" size="large">
          <FormLabel> Confirmer Mot de Passe</FormLabel>
          <FormControl
            value={cpassword}
            onChange={this.handleChange}
            type="password"
            placeholder="Confirmer mot de passe..." 
          />
        </FormGroup>
        <FormGroup controlId="username" size="large">
          <FormLabel>Nom d'utilisateur</FormLabel>
          <FormControl
            autoFocus
            value={username}
            onChange={this.handleChange}
            type="string"
            placeholder="Animalerie Coco" 
          />
        </FormGroup>
        <FormGroup controlId="phoneNumber" size="large">
          <FormLabel>Numéro de téléphone</FormLabel>
          <FormControl
            autoFocus
            value={phoneNumber}
            onChange={this.handleChange}
            type="number"
            placeholder="06XXXXXXXX"
          />
        </FormGroup>
        <Button onClick={this.send} block size="large" type="submit">
          Inscription
        </Button>
      </div>
    );
  }
}