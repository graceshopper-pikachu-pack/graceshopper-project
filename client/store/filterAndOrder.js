const ORDER_BY_NAME = "ORDER_BY_NAME";
const ORDER_BY_PRICE_ASC = "ORDER_BY_PRICE_ASC";
const ORDER_BY_PRICE_DESC = "ORDER_BY_PRICE_DESC";

export const orderByName = (products) => {
  return {
    type: ORDER_BY_NAME,
    products,
  };
};

export const orderByPriceAsc = (products) => {
  return {
    type: ORDER_BY_PRICE_ASC,
    products,
  };
};

export const orderByPriceDesc = (products) => {
  return {
    type: ORDER_BY_PRICE_DESC,
    products,
  };
};

export const filterByCategory = (products, orderBy, category) => {
  return (dispatch) => {
    const filteredProducts = products.filter(
      (product) => product.category === category
    );

    if (orderBy === "name") {
      dispatch(orderByName(filteredProducts));
    } else if (orderBy === "ascending-price") {
      dispatch(orderByPriceAsc(filteredProducts));
    } else if (orderBy === "descending-price") {
      dispatch(orderByPriceDesc(filteredProducts));
    }
  };
};

export const filterByAll = (products, orderBy) => {
  return (dispatch) => {
    if (orderBy === "name") {
      dispatch(orderByName(products));
    } else if (orderBy === "ascending price") {
      dispatch(orderByPriceAsc(products));
    } else if (orderBy === "descending price") {
      dispatch(orderByPriceDesc(products));
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case ORDER_BY_PRICE_ASC:
      return action.products.sort((a, b) => a.price - b.price);
    case ORDER_BY_PRICE_DESC:
      return action.products.sort((a, b) => b.price - a.price);
    case ORDER_BY_NAME:
      return action.products.sort((a, b) => {
        let nameA = a.productName.toLowerCase(),
          nameB = b.productName.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    default:
      return state;
  }
};
