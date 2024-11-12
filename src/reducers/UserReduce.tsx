import { Users } from "../interfaces/User";

type State = {
	user: Users[];
	selectedUser?: Users;
};
type Action =
	| { type: "SET_USER"; payload: Users[] }
	| { type: "REMOVE_USER"; payload: number | string }
	| { type: "SET_SELECTED_USER"; payload: Users | undefined};

const UserReducer = (state: State, action: Action) => {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.payload,
			};
		case "REMOVE_USER":
			return {
				...state,
				products: state.user.filter((item) => item.id !== action.payload),
			};

		case "SET_SELECTED_USER":
			return {
				...state,selectedUser: action.payload
			}

		default:
			return state;
	}
};

export default UserReducer;