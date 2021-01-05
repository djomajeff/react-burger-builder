import React from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuider";
import Checkout from "./containers/Checkout/Checkout";
import { Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" exact component={Checkout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
