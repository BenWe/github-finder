import axios from "axios";

import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import User from "./models/User";
import "./App.css";

interface Props {}

interface State {
  users: User[];
  isLoading: boolean;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { users: [], isLoading: false };
  }

  searchUsers = async (text: string) => {
    this.setState({ users: [], isLoading: true });

    const queryString = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    const response = await axios.get(queryString);
    const users: User[] = response.data.items;

    this.setState({ users: users, isLoading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], isLoading: false });
  };

  render() {
    const { users, isLoading }: State = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            shouldShowClear={users.length > 0}
          />
          <Users users={users} isLoading={isLoading} />
        </div>
      </div>
    );
  }
}

export default App;
