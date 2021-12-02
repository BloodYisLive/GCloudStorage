/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import auth from './AuthReducer';
import currentFolder from './CurrentFolderReducer';
export default combineReducers({
	auth,
	currentFolder,
});
