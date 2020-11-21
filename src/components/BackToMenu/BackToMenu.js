import React from "react";
import { Link } from "react-router-dom";
import classes from "./BackToMenu.module.css";

const BackToMenu = () => {
  return (
    <div className={classes.BackDiv}>
      <Link to="/" className={classes.BackBtn + " col-2 rounded-pill"}>
        <span>Menu</span>
      </Link>
    </div>
  );
};

export default BackToMenu;
