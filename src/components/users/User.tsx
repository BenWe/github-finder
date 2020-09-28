import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

import Spinner from "../layout/Spinner";

import IUser from "../../models/IUser";

interface Props extends RouteComponentProps<MatchParams> {
  getUser(username: string): void;
  user?: IUser;
  isLoading: boolean;
}

interface MatchParams {
  login: string;
}

interface State {}

class User extends Component<Props, State> {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }

  render() {
    const { isLoading, user } = this.props;

    if (isLoading) {
      return <Spinner />;
    } else {
      if (!user) {
        return <div>500</div>;
      }
      const { avatar_url, login, html_url } = user;

      return <div>{login}</div>;
    }

    // const { name, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, hireable} = this.props.user;
  }
}

export default User;
