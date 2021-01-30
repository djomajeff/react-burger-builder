import * as actionsTypes from "../actions/actionTypes";
import { updateObject } from "../../helper/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const purchaseIngrdientStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.id });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersFailed = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, { loading: false, orders: action.orders });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.PURCHASE_INIT: return purchaseInit(state, action);
    case actionsTypes.PURCHASE_INGREDIENT_START: return purchaseIngrdientStart(state, action);
    case actionsTypes.PURCHASE_INGREDIENT_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actionsTypes.PURCHASE_INGREDIENT_FAIL: return purchaseBurgerFail(state, action);
    case actionsTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
    case actionsTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action);
    case actionsTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    default: return state;
  }
};

export default reducer;
