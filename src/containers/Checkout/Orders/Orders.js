import React, { Component } from "react";
import Order from "../../../components/Order/Order";
import axios from "../../../axios-order";
import withErrorHandler from "../../../WithErrorHandler/WithErrorHandler";
import { connect } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actions from "../../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrder(this.props.token, this.props.userId);
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
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
