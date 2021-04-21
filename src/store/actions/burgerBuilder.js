import * as actionType from "./actionTypes";

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
  return {
    type: actionType.INIT_INGREDIENTS,
  };
};
