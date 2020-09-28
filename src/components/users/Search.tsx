import React, { ChangeEvent, Component, FormEvent } from "react";

interface Props {}
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
    console.log(this.state.text);
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
      </div>
    );
  }
}

export default Search;
