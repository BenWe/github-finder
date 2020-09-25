import React from "react";

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
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  iconString: "fab fa-github",
};

export default Navbar;
