/* eslint-disable prettier/prettier */
import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { LogoutUser } from '../../redux/actions';

const Settings = () => {
	const dispatch = useDispatch();
	const logoutUser = () => {
		dispatch(LogoutUser());
	};

	return (
		<View>
			<TouchableOpacity
				onPress={logoutUser}
			>
				<Text>Logout</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Settings;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

