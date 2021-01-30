import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

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
  return (dispatch) => {
    dispatch(purchaseIngredientStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch(purchaseIngredientSucces(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseIngredientFail(error));
      });
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
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams =
      `?auth=${token}&orderBy="userId"&equalTo="` + userId + `"`;
    axios
      .get("/orders.json" + queryParams)
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((error) => {
        dispatch(fetchOrdersFailed(error));
      });
  };
};
