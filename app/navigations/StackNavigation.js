/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import {
	Login,
	Register,
	FolderContents,
	Folders,
} from '../screens';
import auth from '@react-native-firebase/auth';
import { TabNavigation } from '../navigations';
import { Header } from '../components';
import { LoginUser } from '../redux/actions';
const Stack = createNativeStackNavigator();

export const FolderStackNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Folder" component={Folders}
				options={{
					header: props => <Header headerText="Folders" />,
				}}
			/>
			<Stack.Screen name="Folder Items" component={FolderContents}
				options={{
					header: props => <Header headerText="Folders Items" backButton={true} />,
				}}
			/>
		</Stack.Navigator>
	);
};

const RootNavigation = () => {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();
	const userToken = useSelector((state) => state.auth.userToken);
	const dispatch = useDispatch();

	function onAuthStateChanged(user) {
		//dispatch(LoginUser(user.uid));
		setUser(user);
		if (initializing) { setInitializing(false); }
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	if (initializing) { return null; }

	return (
		<NavigationContainer>
			{user == null ?
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="Login Screen" component={Login} />
					<Stack.Screen name="Register Screen" component={Register} />
				</Stack.Navigator>
				:
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="Files" component={TabNavigation} />
				</Stack.Navigator>}
		</NavigationContainer>
	);
};

export default RootNavigation;
