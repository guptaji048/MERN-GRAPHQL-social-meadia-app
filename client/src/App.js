import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Base from "./components/Base";
import Post from "./components/Post";
import { AuthProvider } from "./authentication/auth";
import AuthRoute from "./authentication/AuthRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <div className="ui container">
            <Base />
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <Route exact path="/post" component={Post} />
          </div>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
