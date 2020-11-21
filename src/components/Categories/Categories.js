import React from "react";
import classes from "./Categories.module.css";

const Categories = (props) => {
  const categoriesList = props.categories.map((categ) => {
    return (
      <div className={classes.CategoryContainer + " col-4"}>
        <div
          key={categ}
          onClick={() => props.changeCateg(categ)}
          className={classes.Category + " rounded-pill"}
        >
          <span>{categ}</span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h2>Pick a Category:</h2>
      {categoriesList}
    </div>
  );
};

export default Categories;
