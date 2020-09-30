import axios from "axios";

import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import User from "./components/users/User";

import IAlert from "./models/IAlert";
import IUser from "./models/IUser";
import IRepo from "./models/IRepo";

import "./App.css";

const App = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<IAlert | undefined>(undefined);

  const getUser = async (username: string) => {
    setIsLoading(true);

    const queryString = `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    const response = await axios.get(queryString);
    const user: IUser = response.data;

    setUser(user);
    setIsLoading(false);
  };

  const getRepos = async (username: string) => {
    setIsLoading(true);

    const queryString = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    const response = await axios.get(queryString);
    const repos: IRepo[] = response.data;

    setRepos(repos);
    setIsLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
  };

  const searchUsers = async (text: string) => {
    setUsers([]);
    setIsLoading(true);

    const queryString = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    const response = await axios.get(queryString);
    const users: IUser[] = response.data.items;

    setUsers(users);
    setIsLoading(false);
  };

  const showAlert = async (text: string, type: string) => {
    setAlert({ text, type });
    setTimeout(() => setAlert(undefined), 5000);
  };

  return (
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
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    shouldShowClear={users.length > 0}
                    setAlert={showAlert}
                  />
                  <Users users={users} isLoading={isLoading} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getRepos={getRepos}
                  user={user}
                  repos={repos}
                  isLoading={isLoading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
