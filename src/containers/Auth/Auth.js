import React from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../helper/utility";

class Auth extends React.Component {
  state = {
    controls: {
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
    },
    isSignup: false,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirect !== "/") {
      this.props.onAuthRedirectPath();
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        touched: true,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
      }),
    });
    this.setState({ controls: updatedControls });
  };

  render() {
    let formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        setup: this.state.controls[key],
      });
    }

    let errorMessage = null;
    let authRedirect = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    let form = (
      <form onSubmit={this.submitHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            {...formElement.setup}
            key={formElement.id}
            shouldValidate={formElement.setup.validation}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button type="Success">SUBMIT</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {form}
        <Button type="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

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
