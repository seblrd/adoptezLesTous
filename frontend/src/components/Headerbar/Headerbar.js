import React from "react";
import { Button } from "react-bootstrap";
import API from "../../utils/API";

export class Headerbar extends React.Component {
  disconnect = () => {
    API.logout();
    window.location = "/login";
  };
  render() {
    return (
      <header className="">
        <div className="App-header">
          <p className='App-header-button'><h1>Adoptez les Tous !</h1></p>
          <p><Button className='Button' onClick={this.disconnect} >Se déconnecter</Button></p>
        </div>
        
        <div className="Navbar">
          <Button className= "Button" href="/">Home</Button>{' '}
          <Button className= "Button" href="/login">Se connecter</Button>{' '}
          <Button className= "Button" href="/register">S'inscrire</Button>{' '}
        </div>
      </header>
    );
  }
}
