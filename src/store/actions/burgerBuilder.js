import * as actionType from "./actionTypes";
import axios from "../../axios-order";

export const addIngredient = (ingName) => {
  return {
    type: actionType.ADD_INGREDIENT,
    ingredientName: ingName,
  };
};

export const removeIngredient = (ingName) => {
  return {
    type: actionType.REMOVE_INGREDIENT,
    ingredientName: ingName,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionType.FETCH_INGREDIENT_FAILED,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionType.SET_INGREDIENT,
    ingredients,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
