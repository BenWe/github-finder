import React from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import User from "../../models/User";

interface Props {
  users: User[];
  isLoading: boolean;
}

const Users = ({ users, isLoading }: Props) => {
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
