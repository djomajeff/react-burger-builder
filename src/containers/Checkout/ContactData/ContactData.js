import classes from "./ContactData.module.css";
import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as orderAction from "../../../store/actions/order";
import WithErrorHandler from "../../../WithErrorHandler/WithErrorHandler";
import { updateObject, checkValidity } from "../../../helper/utility";

const orderFormPattern = ({
  elementType,
  type,
  placeholder,
  value,
  options,
  validation,
  valid,
  touched,
}) => {
  const object = {
    elementType,
    elementConfig: {
      type,
      placeholder,
      options,
    },
    value,
    validation,
    valid,
    touched,
  };
  return object;
};

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: orderFormPattern({
      elementType: "input",
      placeholder: "Your Name",
      type: "text",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    }),
    street: orderFormPattern({
      elementType: "input",
      placeholder: "Street",
      type: "text",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    }),
    zipCode: orderFormPattern({
      elementType: "input",
      placeholder: "ZIP Code",
      type: "text",
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    }),
    country: orderFormPattern({
      elementType: "input",
      placeholder: "Country",
      type: "text",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    }),
    email: orderFormPattern({
      elementType: "input",
      placeholder: "Your Mail",
      type: "text",
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    }),
    deliveryMethod: orderFormPattern({
      elementType: "select",
      value: "cheapest",
      options: [
        { value: "fastest", displayValue: "Fastest" },
        { value: "cheapest", displayValue: "Cheapest" },
      ],
      validation: {},
      valid: true,
      touched: false,
    }),
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    // setState({ isLoading: true });
    const formData = {};
    for (let formDataIdentifier in orderForm) {
      formData[formDataIdentifier] = orderForm[formDataIdentifier].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true,
    });
    let formIsValid = true;

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    for (let inputIdentifier in updatedOrderForm)
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;

    setFormIsValid(formIsValid);
    setOrderForm(updatedOrderForm);
  };

  let formElementsArray = [];

  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      setup: orderForm[key],
    });
  }

  let form = props.loading ? (
    <Spinner />
  ) : (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formElement) => (
        <Input
          {...formElement.setup}
          key={formElement.id}
          shouldValidate={formElement.setup.validation}
          changed={(event) => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button type="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );

  // if (props.loading) {
  //   form = <Spinner />;
  // }

  return (
    <div className={classes.ContactData}>
      <h3>Enter your Contact Data</h3>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(orderAction.purchaseIngredient(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(ContactData, axios));
