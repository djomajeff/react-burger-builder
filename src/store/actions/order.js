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

export const purchaseIngrdientStart = () => {
  return {
    type: actionTypes.PURCHASE_INGREDIENT_START,
  };
};

export const purchaseIngredient = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseIngrdientStart());
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        console.log(response.data);
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

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};

export const fetchOrderFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAILED,
    error,
  };
};

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders,
  };
};

export const fetchOrder = () => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        console.log(fetchedOrders);
        dispatch(fetchOrderSuccess(fetchedOrders));
      })
      .catch((error) => {
        dispatch(fetchOrderFailed(error));
      });
  };
};
