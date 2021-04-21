import { put } from "redux-saga/effects";
import axios from "../../axios-order";

import * as actions from "../actions/index";

export function* purchaseIngredientSaga(action) {
  try {
    yield put(actions.purchaseIngredientStart());
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );

    yield put(
      actions.purchaseIngredientSucces(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purchaseIngredientFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const queryParams =
    `?auth=${action.token}&orderBy="userId"&equalTo="` + action.userId + `"`;
  try {
    const response = yield axios.get("/orders.json" + queryParams);
    const fetchedOrders = [];

    for (let key in response.data) {
      yield fetchedOrders.push({
        ...response.data[key],
        id: key,
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFailed(error));
  }
}
