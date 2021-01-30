import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../helper/utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updateState = {
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
    ingredients: updatedIngredients,
    building: true,
  };
  return updateObject(state, updateState);
};

const removeIngredient = (state, action) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updateSt = {
    totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
    ingredients: updatedIngs,
    building: true,
  };
  return updateObject(state, updateSt);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    error: false,
    ingredients: action.ingredients,
    totalPrice: 4,
    building: false,
  });
};

const fetchIngredientFailed = (state, action) => {
  return updateObject(state, {
    error: true,
    ingredients: action.ingredients,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT: return addIngredient(state, action);
    case actionType.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionType.SET_INGREDIENT: return setIngredients(state, action);
    case actionType.FETCH_INGREDIENT_FAILED: return fetchIngredientFailed(state, action);
    default: return state;
  }
};

export default reducer;
