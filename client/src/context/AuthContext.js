import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
	user: {
		_id: "6304e72e444458445c17b2b8",
		username: "jane",
		email: "jane@gmail.com",
		password: "$2b$10$7QkdBRg.Heygf0SBEXURHu08NVSzHv3nzCWlseAg.jwPg8yQLxebW",
		profilePicture:"",
		coverPicture:"",
		followers: ["6304e62debbb7922828a2292"],
		followings: [],
		},
	isFetching: false,
	error: false
};

export const AuthContext = createContext(INITIAL_STATE); 

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	return (
		<AuthContext.Provider value={{user:state.user, isFetching:state.isFetching, error:state.error, dispatch,}}>
			{children}
		</AuthContext.Provider>
	)
}