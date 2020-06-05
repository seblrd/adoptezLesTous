import React from "react";
import { Button } from "react-bootstrap";
import API from "../../utils/API";

export class Headerbar extends React.Component {
  state = {
    connected: localStorage.getItem("connected"),
  }
  disconnect = () => {
    API.logout();
    window.location = "/login";
  };
  authButton = () => {
    if(this.state.connected === 'true')
    {
      return (
        <div className="App-header-button">
          <Button className='Button' onClick={this.disconnect} >Se déconnecter</Button>
        </div>
      )
    } 
    return (
      <div className="App-header-button">        
        <Button className= "Button" href="/login">Se connecter</Button>
        <Button className= "Button" href="/register">S'inscrire</Button>
      </div>
    )
  }
  render() {
    return (
      <header className="App-header">
        <div className="App-header-opacity">
          <div className="App-header-title">
            {this.authButton()}
            <div><h1>Adoptez les Tous !</h1></div>
          </div>
            <div><Button className= "Button" href="/">Home</Button></div>
            </div>
      </header>
    );
  }
}
