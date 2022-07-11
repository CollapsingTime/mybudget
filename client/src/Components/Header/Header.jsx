import React from "react";
import { Fragment } from "react";
import Welcome from "./Welcome/Welcome.jsx";
import Navigation from "./Navigation/Navigation.jsx";

const Header = () => {
  return (
    <Fragment>
      <Navigation />
      <Welcome />
    </Fragment>
  );
};

export default Header;
