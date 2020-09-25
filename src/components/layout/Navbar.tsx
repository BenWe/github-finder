import React, { Component } from "react";

interface Props {
  title: string;
  iconString: string;
}
interface State {}

class Navbar extends Component<Props, State> {
  public static defaultProps = {
    title: "Github Finder",
    iconString: "fab fa-github",
  };

  state = {};

  render() {
    return (
      <nav className="navbar bg-primary">
        <h1>
          <i className={this.props.iconString} /> {this.props.title}
        </h1>
      </nav>
    );
  }
}

export default Navbar;
