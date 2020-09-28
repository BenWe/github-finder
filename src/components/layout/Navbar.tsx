import React from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  iconString: string;
}

const Navbar = ({ iconString, title }: Props) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={iconString} /> {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  iconString: "fab fa-github",
};

export default Navbar;
