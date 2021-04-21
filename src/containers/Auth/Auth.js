import React, { useState, useEffect } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../helper/utility";

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: { placeholder: "Email Address", type: "email" },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: { placeholder: "Password", type: "password" },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignup, setIsSignup] = useState(false);
  const { buildingBurger, authRedirectPath, onAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onAuthRedirectPath]);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        touched: true,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
      }),
    });
    setControls(updatedControls);
  };

  let formElementsArray = [];

  for (let key in controls) {
    formElementsArray.push({
      id: key,
      setup: controls[key],
    });
  }

  let errorMessage = null;
  let authRedirect = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  if (props.isAuth) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  let form = (
    <form onSubmit={submitHandler}>
      {formElementsArray.map((formElement) => (
        <Input
          {...formElement.setup}
          key={formElement.id}
          shouldValidate={formElement.setup.validation}
          changed={(event) => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button type="Success">SUBMIT</Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      {form}
      <Button type="Danger" clicked={switchAuthModeHandler}>
        SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    buildingBurger: state.burgerBuilder.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
