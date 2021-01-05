import React from "react";
import classes from "../Burger/Burger.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import { withRouter } from "react-router-dom";

const burger = (props) => {
  console.log(props);
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        return <BurgerIngredients key={ingKey + i} type={ingKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Start Adding ingredients</p>;
  }

  // console.log(transformedIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);
