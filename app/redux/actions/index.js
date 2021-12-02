/* eslint-disable prettier/prettier */
export const LoginUser = data => {
	return {
		type: 'LOGIN_USER',
		data,
	};
};

export const LogoutUser = () => {
	return {
		type: 'LOGOUT_USER',
	};
};

export const currentFolderName = data => {
	return {
		type: 'CURRENT_FOLDER',
		data,
	}
}