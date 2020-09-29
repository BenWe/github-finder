import React from "react";

import IRepo from "../../models/IRepo";

interface Props {
  repo: IRepo;
}

const RepoItem = (props: Props) => {
  const { html_url, name } = props.repo;
  return (
    <div className="card">
      <h3>
        <a href={html_url}>{name}</a>
      </h3>
    </div>
  );
};

export default RepoItem;
