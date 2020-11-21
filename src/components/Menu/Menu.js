import React from "react";
import { Link } from "react-router-dom";
import classes from "./Menu.module.css";

const Menu = () => {
  return (
    <div>
      <div className={classes.Title}>TRIVIA</div>
      <Link to="/play" className={classes.MenuLink + " col-3 rounded-pill"}>
        <span>Play</span>
      </Link>
      <Link
        to="/new-question"
        className={classes.MenuLink + " col-3 rounded-pill"}
      >
        <span>Create</span>
      </Link>
    </div>
  );
};

export default Menu;
