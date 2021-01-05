import * as actionType from "../actions/actionTypes";
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        totalPrice:
          state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
      };
    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        totalPrice:
          state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
      };
    case actionType.SET_INGREDIENT:
      return {
        ...state,
        error: false,
        ingredients: action.ingredients,
        totalPrice: 4,
      };
    case actionType.FETCH_INGREDIENT_FAILED:
      return {
        ...state,
        error: true,
        ingredients: action.ingredients,
      };
    default:
      return state;
  }
};

export default reducer;
