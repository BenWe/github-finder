import React from "react";

import IRepo from "../../models/IRepo";
import RepoItem from "./RepoItem";

interface Props {
  repos: IRepo[];
}

const Repos = (props: Props) => {
  return (
    <div>
      {props.repos.map((repo) => (
        <RepoItem repo={repo} key={repo.id} />
      ))}
    </div>
  );
};

export default Repos;
