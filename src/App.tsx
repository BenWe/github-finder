import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import User from "./components/users/User";

import IAlert from "./models/IAlert";

import GithubState from "./context/github/GithubState";

import "./App.css";

const App = () => {
  const [alert, setAlert] = useState<IAlert | undefined>(undefined);

  const showAlert = async (text: string, type: string) => {
    setAlert({ text, type });
    setTimeout(() => setAlert(undefined), 5000);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Fragment>
                    <Search setAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => <User {...props} />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
