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
import auth from '@react-native-firebase/auth';

const Settings = () => {
	const dispatch = useDispatch();
	const logoutUser = () => {
		auth()
			.signOut()
			.then(() => dispatch(LogoutUser()));

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

