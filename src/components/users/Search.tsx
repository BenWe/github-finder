import React, { ChangeEvent, FormEvent, useContext, useState } from "react";

import GithubContext from "../../context/github/GithubContext";

interface Props {
  setAlert(text: string, type: string): void;
}

const Search = ({ setAlert }: Props) => {
  const githubContext = useContext(GithubContext);
  const [text, setText] = useState<string>("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "light");
    } else {
      githubContext.searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={onChange}
        />
        <input type="submit" name="Search" className="btn btn-dark btn-block" />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
