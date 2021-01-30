import React from "react";
import Button from "../UI/Button/Button";

class OrderSummary extends React.Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingredKey) => {
        return (
          <li key={ingredKey}>
            <span style={{ textTransform: "capitalize" }}>{ingredKey} </span>
            {this.props.ingredients[ingredKey]}
          </li>
        );
      }
    );
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
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout ?</p>
        <Button type="Danger" clicked={this.props.purchaseCancel}>
          CANCEL
        </Button>
        <Button type="Success" clicked={this.props.purchaseContinue}>
          CONTINUE
        </Button>
      </React.Fragment>
    );
  }
}

export default OrderSummary;
