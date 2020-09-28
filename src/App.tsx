import axios from "axios";

import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import Search from "./components/users/Search";
import Users from "./components/users/Users";

import IAlert from "./models/IAlert";
import IUser from "./models/IUser";

import "./App.css";

interface Props {}

interface State {
  users: IUser[];
  user?: IUser;
  isLoading: boolean;
  alert?: IAlert;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { users: [], user: undefined, isLoading: false };
  }

  getUser = async (username: string) => {
    this.setState({ users: [], isLoading: true });

    const queryString = `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    const response = await axios.get(queryString);
    const user: IUser = response.data;

    this.setState({ user: user, isLoading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], isLoading: false });
  };

  searchUsers = async (text: string) => {
    this.setState({ users: [], isLoading: true });

    const queryString = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    const response = await axios.get(queryString);
    const users: IUser[] = response.data.items;

    this.setState({ users: users, isLoading: false });
  };

  setAlert = async (text: string, type: string) => {
    this.setState({ alert: { text, type } });

    setTimeout(() => this.setState({ alert: undefined }), 5000);
  };

  render() {
    const { users, isLoading }: State = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      shouldShowClear={users.length > 0}
                      setAlert={this.setAlert}
                    />
                    <Users users={users} isLoading={isLoading} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
