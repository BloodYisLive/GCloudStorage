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
import { useDispatch } from 'react-redux';
import { COLORS, SIZES, width } from '../constants';
import { LoginUser } from '../redux/actions';

const Login = ({ navigation }) => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const loginUser = () => {
		auth()
			.signInWithEmailAndPassword(email, password)
			.then((e) => {
				dispatch(LoginUser(e.user.uid));
			}).catch((e) => {
				if (e.code === 'auth/user-not-found') {
					console.log('User not found. Please check your email and password.');
				}

				console.log(e);
			});
	};

	return (
		<View style={[styles.container]}>
			<View>
				<View style={[styles.inputBox]}>
					<TextInput
						placeholder="Enter Registerd Email..."
						style={{ fontSize: SIZES.h2 }}
						onChangeText={(e) => setEmail(e)}
					/>
				</View>
				<View style={[styles.inputBox]}>
					<TextInput
						placeholder="Enter Password..."
						style={{ fontSize: SIZES.h2 }}
						onChangeText={(e) => setPassword(e)}
					/>
				</View>
				<TouchableOpacity
					style={styles.loginButtonContainer}
					onPress={loginUser}
				>
					<Text style={styles.loginText}>Login</Text>
				</TouchableOpacity>
				<View style={styles.registerTextContainer}>
					<Text style={[styles.registerText]}>Don't have an account? </Text>
					<TouchableOpacity
						onPress={() => navigation.navigate('Register Screen')}
					>
						<Text style={[styles.registerText, { fontWeight: 'bold' }]}>Register</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default Login;

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
		//fontSize: SIZES.h2,
	},
	loginButtonContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: width * 85 / 100,
		paddingVertical: 12,
		marginVertical: 20,
		backgroundColor: COLORS.red,
		borderRadius: 36,
	},
	loginText: {
		fontSize: SIZES.h1,
		fontWeight: 'bold',
		color: COLORS.white,
	},
	registerTextContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},
	registerText: {
		color: COLORS.white,
		fontSize: SIZES.h2,
	},
});
