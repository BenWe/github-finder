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
    this.state = { users: [], isLoading: true };
  }

  async componentDidMount() {
    this.setState({ users: [], isLoading: true });

    const response = await axios.get(
      `https://api.github.com/users?
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const users: User[] = response.data;

    this.setState({ users: users, isLoading: false });
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search />
          <Users users={this.state.users} isLoading={this.state.isLoading} />
        </div>
      </div>
    );
  }
}

export default App;
