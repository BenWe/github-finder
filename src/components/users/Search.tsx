import React, { ChangeEvent, FormEvent, useState } from "react";

interface Props {
  clearUsers(): void;
  searchUsers(text: string): void;
  setAlert(text: string, type: string): void;

  shouldShowClear: boolean;
}

const Search = ({
  clearUsers,
  searchUsers,
  setAlert,
  shouldShowClear,
}: Props) => {
  const [text, setText] = useState<string>("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "light");
    } else {
      searchUsers(text);
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
      {shouldShowClear && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
