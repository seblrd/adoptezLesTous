import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard.js";
import { Login } from "./components/Login/Login.js";
import { Register } from "./components/Register/Register.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import { Footerbar } from "./components/Footerbar/Footerbar.js";
import { Headerbar } from "./components/Headerbar/Headerbar.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
      < Headerbar />
        <div className="App-content">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </div>
        < Footerbar />
      </div>
    );
  }
}
export default App;
