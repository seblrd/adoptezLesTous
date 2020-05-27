import React from "react";
import API from "../../utils/API";
import {Nav} from 'react-bootstrap'

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
        <div>          
          <Nav.Item>
            <Nav.Link href="/account">Mon compte</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={this.disconnect} >Se déconnecter</Nav.Link>
          </Nav.Item>
        </div>
      )
    } 
    return (
      <div>
        <Nav.Item>
          <Nav.Link href="/login">Connexion</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/register">S'inscrire</Nav.Link>
        </Nav.Item>
      </div>
    )
  }
  render() {
    return (
      <header >
        <div className="App-header">
          <div className="App-header-opacity">
            <div className="App-header-title">
              <div><h1>Adoptez les Tous !</h1></div>
            </div>
            <div>
              <Nav justify="true" variant="tabs" style={{fontSize:0.6+'em',marginTop: 1+'em'}} defaultActiveKey={window.location.pathname} >
                <Nav.Item>
                  <Nav.Link href="/">Accueil</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/newPet">Nouvel animal</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/find">Rechercher</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  {this.authButton()}
                </Nav.Item>
              </Nav>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
