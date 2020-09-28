import axios from "axios";

import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import IAlert from "./models/IAlert";
import User from "./models/User";
import "./App.css";

interface Props {}

interface State {
  users: User[];
  isLoading: boolean;
  alert?: IAlert;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { users: [], isLoading: false };
  }

  clearUsers = () => {
    this.setState({ users: [], isLoading: false });
  };

  searchUsers = async (text: string) => {
    this.setState({ users: [], isLoading: true });

    const queryString = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    const response = await axios.get(queryString);
    const users: User[] = response.data.items;

    this.setState({ users: users, isLoading: false });
  };

  setAlert = async (text: string, type: string) => {
    this.setState({ alert: { text, type } });

    setTimeout(() => this.setState({ alert: undefined }), 5000);
  };

  render() {
    const { users, isLoading }: State = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            shouldShowClear={users.length > 0}
            setAlert={this.setAlert}
          />
          <Users users={users} isLoading={isLoading} />
        </div>
      </div>
    );
  }
}

export default App;
