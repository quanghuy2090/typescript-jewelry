import { Products } from "../interfaces/Products";

type State = {
  products: Products[];
  selectedProduct?: Products;
};
type Action =
  | { type: "SET_PRODUCTS"; payload: Products[] }
  | { type: "ADD_PRODUCT"; payload: Products }
  | { type: "REMOVE_PRODUCT"; payload: number | string }
  | { type: "UPDATE_PRODUCT"; payload: Products }
  | { type: "SET_SELECTED_PRODUCT"; payload: Products | undefined };

const ProductReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };

    case "SET_SELECTED_PRODUCT":
      return {
        ...state,
        selectedProduct: state.products.find(
          (item) => item.id === action.payload.id
        ),
      };

    default:
      return state;
  }
};

export default ProductReducer;
