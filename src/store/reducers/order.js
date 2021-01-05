import * as actionsTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionsTypes.PURCHASE_INGREDIENT_START:
      return {
        ...state,
        loading: true,
      };
    case actionsTypes.PURCHASE_INGREDIENT_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.id,
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      };
    case actionsTypes.PURCHASE_INGREDIENT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionsTypes.FETCH_ORDER_START:
      return {
        ...state,
        loading: true,
      };
    case actionsTypes.FETCH_ORDER_FAILED:
      return {
        ...state,
        loading: false,
      };
    case actionsTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders,
      };
    default:
      return state;
  }
};

export default reducer;
