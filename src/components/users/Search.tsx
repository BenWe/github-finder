import React, { ChangeEvent, Component, FormEvent } from "react";

interface Props {
  clearUsers(): void;
  searchUsers(text: string): void;
  setAlert(text: string, type: string): void;

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
    const text = this.state.text;
    if (text === "") {
      this.props.setAlert("Please enter something", "light");
    } else {
      this.props.searchUsers(text);
      this.setState({ text: "" });
    }
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
