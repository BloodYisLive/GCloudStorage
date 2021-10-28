/* eslint-disable prettier/prettier */
const initialState = {
	userToken: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_USER':
			return { ...state, userToken: action.data };
		case 'LOGOUT_USER':
			return { userToken: null };
		default:
			return state;
	}
};

export default authReducer;
