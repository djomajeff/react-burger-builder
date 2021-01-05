import React, { Component } from "react";
import { CheckoutSummary } from "../../components/Order/CheckoutSummary/CheckoutSummary";

export default class Checkout extends Component {
  state = {
    ingredients: {
      bacon: 1,
      salad: 1,
      meat: 1,
      cheese: 1,
    },
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for(let param of query.entries()) {
      console.log("param" + param);
      // [salad, 2]
      ingredients[param[0]] = +param[1];
    };
    console.log("ingrdients: " + ingredients);
    this.setState({
      ingredients: ingredients
    });
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCancelled={this.checkoutCancelledHandler}
        />
      </div>
    );
  }
}
