import React from "react";
import Button from "../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingredKey) => {
    return (
      <li key={ingredKey}>
        <span style={{ textTransform: "capitalize" }}>{ingredKey} </span>
        {props.ingredients[ingredKey]}
      </li>
    );
  });

  return (
    <React.Fragment>
      <h3>Your Orders</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary.map((ingredient) => {
          return ingredient;
        })}
      </ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout ?</p>
      <Button type="Danger" clicked={props.purchaseCancel}>
        CANCEL
      </Button>
      <Button type="Success" clicked={props.purchaseContinue}>
        CONTINUE
      </Button>
    </React.Fragment>
  );
};

export default OrderSummary;
