import React from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/UI/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/UI/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggledHandler = () => {
    this.setState({ showSideDrawer: !this.state.showSideDrawer });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          toggle={this.sideDrawerToggledHandler}
          isAuthenticated={this.props.token !== null}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuthenticated={this.props.token !== null}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Layout);
