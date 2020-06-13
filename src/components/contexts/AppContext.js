import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
	loading: true,
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOADING':
			return {
				...state,
				loading: action.loading
			};
		default:
			return state;
	}
};

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialState);
	return (
		<AppContext.Provider value={{state, dispatch}}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppState = () => {
	const { state } = useContext(AppContext);
	return state;
};

export const useAppDispatch = () => {
	const { dispatch } = useContext(AppContext);
	return dispatch;
};