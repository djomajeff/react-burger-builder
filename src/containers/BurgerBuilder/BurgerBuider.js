import React from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: null,
    totalPrices: 4,
    purchasable: false,
    purchasing: false,
    isLoading: false,
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("https://react-burger-22.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
        console.log(response.data);
      })
      .catch((error) => {});
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((prev, el) => {
        return prev + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    const oldPrice = this.state.totalPrices;
    const newPrice = INGREDIENTS_PRICES[type] + oldPrice;
    updatedIngredients[type] = updatedCount;

    this.setState({
      ingredients: updatedIngredients,
      totalPrices: newPrice,
    });

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const oldPrice = this.state.totalPrices;
    const newPrice = oldPrice - INGREDIENTS_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrices: newPrice,
    });

    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert("continue");
    this.setState({ isLoading: true });

    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrices.toFixed(2),
    //   deliveryMethod: "fastest",
    //   customer: {
    //     name: "Jeff Djomatchoua",
    //     address: {
    //       street: "Makepe",
    //       zipCode: "29345",
    //       country: "Cameroon",
    //     },
    //     email: "testjeff@gmail.com",
    //   },
    // };

    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     this.setState({ isLoading: false, purchasing: false });
    //   })
    //   .catch((error) => {
    //     this.setState({ isLoading: false, purchasing: false });
    //     console.log(error);
    //   });

    const queryParams = [];
    for(let i in this.state.ingredients) {

      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: "/checkout",
      search: '?' + queryString
    });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let burger = <Spinner />;
    let orderSummary = null;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientsAdded={this.addIngredientHandler}
            ingredientsRemoved={this.removeIngredientHandler}
            disabled={disableInfo}
            price={this.state.totalPrices}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          purchaseContinue={this.purchaseContinueHandler}
          purchaseCancel={this.purchaseCancelHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrices}
        />
      );
    }

    if (this.state.isLoading) {
      orderSummary = <Spinner />;
    }

    // {meat: true, bacon:false, ...}
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default BurgerBuilder;
