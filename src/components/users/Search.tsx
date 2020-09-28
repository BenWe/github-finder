import React, { ChangeEvent, Component, FormEvent } from "react";

interface Props {
  searchUsers(text: string): void;
  clearUsers(): void;

  shouldShowClear: boolean;
}
interface State {
  text: string;
}

class Search extends Component<Props, State> {
  state = {
    text: "",
  };

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: event.target.value });
  };

  onSubmit = (event: FormEvent) => {
    event.preventDefault();
    this.props.searchUsers(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type="submit"
            name="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {this.props.shouldShowClear && (
          <button
            className="btn btn-light btn-block"
            onClick={this.props.clearUsers}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
