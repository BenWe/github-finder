import React, { useContext } from "react";

import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

import IUser from "../../models/IUser";

import GithubContext from "../../context/github/GithubContext";

interface Props {
  users: IUser[];
  isLoading: boolean;
}

const Users = () => {
  const githubContext = useContext(GithubContext);
  const { users, isLoading }: Props = githubContext;

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Users;
