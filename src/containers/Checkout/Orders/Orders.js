import React, { Component } from "react";
import Order from "../../../components/Order/Order";
import axios from "../../../axios-order";
import withErrorHandler from "../../../WithErrorHandler/WithErrorHandler";
import { connect } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actions from "../../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrder();
  }

  render() {
    let orders = this.props.loading ? (
      <Spinner />
    ) : (
      <div>
        {this.props.orders.map((order) => (
          <Order
            price={order.price}
            key={order.id}
            ingredients={order.ingredients}
          />
        ))}
      </div>
    );
    return orders;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: () => dispatch(actions.fetchOrder()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
