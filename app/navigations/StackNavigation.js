/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import {
	Login,
	Register,
} from '../screens';
import { TabNavigation } from '../navigations';
import { FolderContents } from '../screens';
import { Header } from '../components';
const Stack = createNativeStackNavigator();

const RootNavigation = () => {
	const userToken = useSelector((state) => state.auth.userToken);
	return (
		<NavigationContainer>
			{userToken == null ?
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
					<Stack.Screen
						name="Folder Contents"
						component={FolderContents}
						options={{
							headerShown: true,
							header: props => <Header headerText="Folder Items" backButton={true} />,
						}}
					/>
				</Stack.Navigator>}
		</NavigationContainer>
	);
};

export default RootNavigation;
