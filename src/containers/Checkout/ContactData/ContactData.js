import classes from "./ContactData.module.css";
import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as orderAction from "../../../store/actions/order";
import WithErrorHandler from "../../../WithErrorHandler/WithErrorHandler";

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

class ContactData extends Component {
  state = {
    formIsValid: false,
    // isLoading: false,
    orderform: {
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
    },
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();
    // this.setState({ isLoading: true });
    const formData = {};
    for (let formDataIdentifier in this.state.orderform) {
      formData[formDataIdentifier] = this.state.orderform[
        formDataIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };

    this.props.onOrderBurger(order);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderFormData = this.state.orderform;
    let formIsValid = true;

    updatedOrderFormData[inputIdentifier].value = event.target.value;
    updatedOrderFormData[inputIdentifier].valid = this.checkValidity(
      updatedOrderFormData[inputIdentifier].value,
      updatedOrderFormData[inputIdentifier].validation
    );
    updatedOrderFormData[inputIdentifier].touched = true;

    for (let inputIdentifier in updatedOrderFormData)
      formIsValid = updatedOrderFormData[inputIdentifier].valid && formIsValid;

    this.setState({
      orderForm: updatedOrderFormData,
      formIsValid: formIsValid,
    });
  };

  render() {
    let formElementsArray = [];

    for (let key in this.state.orderform) {
      formElementsArray.push({
        id: key,
        setup: this.state.orderform[key],
      });
    }

    let form = this.props.loading ? (
      <Spinner />
    ) : (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            {...formElement.setup}
            key={formElement.id}
            shouldValidate={formElement.setup.validation}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button type="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    // if (this.props.loading) {
    //   form = <Spinner />;
    // }

    return (
      <div className={classes.ContactData}>
        <h3>Enter your Contact Data</h3>
        {form}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) =>
      dispatch(orderAction.purchaseIngredient(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(ContactData, axios));
