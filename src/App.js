import React from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Switch, Route, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
// import ContactData from "./containers/Checkout/ContactData/ContactData";

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    const asyncCheckout = asyncComponent(() => {
      return import("./containers/Checkout/Checkout");
    });

    const asyncOrder = asyncComponent(() => {
      return import("./containers/Checkout/Orders/Orders");
    });

    const asyncAuth = asyncComponent(() => {
      return import("./containers/Auth/Auth");
    });
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/orders" component={asyncOrder} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          <Switch>
            {routes}
            {/* <Route path="/checkout/contact-data" exact component={ContactData} /> */}
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
