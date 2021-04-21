import * as actionTypes from "./actionTypes";

export const purchaseIngredientFail = (error) => {
  return {
    type: actionTypes.PURCHASE_INGREDIENT_FAIL,
    error,
  };
};

export const purchaseIngredientSucces = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_INGREDIENT_SUCCESS,
    id,
    order: orderData,
  };
};

export const purchaseIngredientStart = () => {
  return {
    type: actionTypes.PURCHASE_INGREDIENT_START,
  };
};

export const purchaseIngredient = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_INGREDIENT,
    orderData,
    token,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS,
    token,
    userId,
  };
};
