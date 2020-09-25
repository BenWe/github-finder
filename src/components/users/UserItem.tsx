import React, { Component } from "react";
import User from "../../models/User";

interface Props {
  user: User;
}
export interface State {}

class UserItem extends Component<Props, State> {
  state = {};

  render() {
    const { login, avatar_url, html_url } = this.props.user;

    return (
      <div className="card text-center">
        <img
          src={avatar_url}
          alt=""
          className="round-img"
          style={{ width: "60px" }}
        />
        <h3>{login}</h3>

        <div>
          <a href={html_url} className="btn btn-dark btn-sm my-1">
            More
          </a>
        </div>
      </div>
    );
  }
}

export default UserItem;
