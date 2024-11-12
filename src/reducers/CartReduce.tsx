import { Cart } from "../interfaces/Cart";

type State = {
	cart: Cart[];
};
type Action =
	// | { type: "SET_USER"; payload: Cart[] }
	| { type: "REMOVE_CART"; payload: number | string }

const CartReducer = (state: State, action: Action) => {
	switch (action.type) {
		// case "SET_USER":
		// 	return {
		// 		...state,
		// 		user: action.payload,
		// 	};
		// case "ADD_PRODUCT":
		// 	return {
		// 		...state,
		// 		products: [...state.products, action.payload],
		// 	};

		// case "UPDATE_PRODUCT":
		// 	return {
		// 		...state,
		// 		products: state.products.map((item) => (item.id === action.payload.id ? action.payload : item)),
		// 	};

		case "REMOVE_CART":
			return {
				...state,
				products: state.cart.filter((item) => item.id !== action.payload),
			};


		default:
			return state;
	}
};

export default CartReducer;