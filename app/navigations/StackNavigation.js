/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import {
	Login,
	Register,
	FolderContents,
	Folders,
} from '../screens';
import { TabNavigation } from '../navigations';
import { Header } from '../components';
const Stack = createNativeStackNavigator();

export const FolderStackNavigation = () => {
	return(
	<Stack.Navigator>
		<Stack.Screen name="Folders" component={Folders} 
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
	)
}

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
				</Stack.Navigator>}
		</NavigationContainer>
	);
};

export default RootNavigation;
