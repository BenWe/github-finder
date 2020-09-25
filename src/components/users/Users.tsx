import React from "react";
import UserItem from "./UserItem";
import User from "../../models/User";

interface Props {
  users: User[];
  isLoading: boolean;
}

const Users = (props: Props) => {
  return (
    <div style={userStyle}>
      {props.users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Users;
