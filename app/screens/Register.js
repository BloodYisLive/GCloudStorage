/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Entypo';
import { addNewUser } from '../api';
import { COLORS, SIZES, width } from '../constants';
const Register = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const onAuthStateChanged = (user) => {
		addNewUser({
			id: user.uid,
		});
	};

	const addUserToDatabase = () => {
		auth()
			.onAuthStateChanged(onAuthStateChanged);
	};

	const registerAccount = () => {
		auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				addUserToDatabase();
				navigation.navigate('Login Screen');
			}).catch((e) => {
				if (e.code === 'auth/email-already-in-use') {
					console.log('That email address is already in use!');
				}

				if (e.code === 'auth/invalid-email') {
					console.log('That email address is invalid!');
				}

				console.error(e);
			});
	};

	return (
		<View style={[styles.container]}>
			<View>
				<View style={styles.registerTextContainer}>
					<Text style={styles.registerText}>Register</Text>
				</View>
				<View style={[styles.inputBox]}>
					<Icon
						name="mail"
						size={30}
						color={COLORS.primary}
						style={{ marginLeft: 10 }}
					/>
					<TextInput
						placeholder="Enter Email..."
						style={{ fontSize: SIZES.h2 }}
						onChangeText={(e) => setEmail(e)}
					/>
				</View>
				<View style={[styles.inputBox]}>
					<Icon
						name="lock"
						size={30}
						color={COLORS.primary}
						style={{ marginLeft: 10 }}
					/>
					<TextInput
						placeholder="Enter Password..."
						style={{ fontSize: SIZES.h2 }}
						onChangeText={(e) => setPassword(e)}
					/>
				</View>
				<View style={[styles.inputBox]}>
					<Icon
						name="lock"
						size={30}
						color={COLORS.primary}
						style={{ marginLeft: 10 }}
					/>
					<TextInput
						placeholder="Confirm Password..."
						style={{ fontSize: SIZES.h2 }}
						onChangeText={(e) => setConfirmPassword(e)}
					/>
				</View>
				<TouchableOpacity
					style={[styles.loginButtonContainer, {
						backgroundColor: password !== confirmPassword ? `${COLORS.black}50` : COLORS.red,
					}]}
					onPress={registerAccount}
					disabled={password === confirmPassword ? false : true}
				>
					<Text style={styles.loginText}>Register</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Register;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputBox: {
		width: width * 85 / 100,
		paddingHorizontal: 10,
		marginVertical: 10,
		borderRadius: 36,
		backgroundColor: COLORS.white,
		flexDirection: 'row',
		//justifyContent: 'center',
		alignItems: 'center',
		//fontSize: SIZES.h2,
	},
	loginButtonContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: width * 85 / 100,
		paddingVertical: 12,
		marginVertical: 20,
		borderRadius: 36,
	},
	loginText: {
		fontSize: SIZES.h1,
		fontWeight: 'bold',
		color: COLORS.white,
	},
	registerTextContainer: {
		marginBottom: 15,
	},
	registerText: {
		color: COLORS.white,
		fontSize: 35,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
