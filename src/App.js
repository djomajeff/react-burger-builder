import React from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuider";
import Checkout from "./containers/Checkout/Checkout";
import { Switch, Route } from "react-router-dom";
import Orders from "./containers/Checkout/Orders/Orders";
// import ContactData from "./containers/Checkout/ContactData/ContactData";

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
            {/* <Route path="/checkout/contact-data" exact component={ContactData} /> */}
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
