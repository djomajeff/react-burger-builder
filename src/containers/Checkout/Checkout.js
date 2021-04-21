import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { CheckoutSummary } from "../../components/Order/CheckoutSummary/CheckoutSummary";
//import Spinner from "../../components/UI/Spinner/Spinner";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const purchaseRedirect = props.purchased ? <Redirect to="/" /> : null;
  let summary = !props.ings ? (
    // <Spinner />
    <Redirect to="/" />
  ) : (
    <div>
      {purchaseRedirect}
      <CheckoutSummary
        ingredients={props.ings}
        checkoutContinued={checkoutContinuedHandler}
        checkoutCancelled={checkoutCancelledHandler}
      />
      <Route
        path={props.match.path + "/contact-data"}
        render={() => (
          <ContactData
            ingredients={props.ings}
            totalPrice={props.price}
            {...props}
          />
        )}
      />
    </div>
  );
  return summary;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
