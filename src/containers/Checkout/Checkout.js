import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { CheckoutSummary } from "../../components/Order/CheckoutSummary/CheckoutSummary";
//import Spinner from "../../components/UI/Spinner/Spinner";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
    let summary = !this.props.ings ? (
      // <Spinner />
      <Redirect to="/" />
    ) : (
      <div>
        {purchaseRedirect}
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCancelled={this.checkoutCancelledHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => (
            <ContactData
              ingredients={this.props.ings}
              totalPrice={this.props.price}
              {...this.props}
            />
          )}
        />
      </div>
    );
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
