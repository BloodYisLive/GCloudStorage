/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
	Image,
	StyleSheet,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
//import FeatherIcon from 'react-native-vector-icons/Feather';
import {
	Folders,
	Storage,
	Search,
	Settings,
} from '../screens/TabScreens';
import { Header, TabBarCustomButton } from '../components';
import { COLORS, ICONS } from '../constants';

const Tab = createBottomTabNavigator();

const Files = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					position: 'absolute',
					bottom: 0,
					right: 0,
					left: 0,
					elevation: 0,
					backgroundColor: COLORS.white,
					borderTopColor: 'transparent',
					height: 70,
				},
			}}
		>
			<Tab.Screen
				name="Folders"
				component={Folders}
				options={{
					tabBarIcon: ({ focused }) => (
						<Image
							source={focused ? ICONS.folder_solid : ICONS.folder_outline}
							style={[styles.iconStyle, {
								tintColor: focused ? COLORS.lightBlack : `${COLORS.lightBlack}60`,
							}]}
						/>
					),
					header: props => <Header headerText="Folders" />,
				}}
			/>
			<Tab.Screen
				name="Storage"
				component={Storage}
				options={{
					tabBarIcon: ({ focused }) => (
						<Image
							source={focused ? ICONS.pie_fill : ICONS.pie_outline}
							style={[styles.iconStyle, {
								tintColor: focused ? COLORS.lightBlack : `${COLORS.lightBlack}60`,
							}]}
						/>
					),
					header: props => <Header headerText="Storage" />,
				}}
			/>
			<Tab.Screen
				name="PickDoc"
				component={Storage}
				options={{
					tabBarIcon: ({ focused }) => (
						<Icon
							name="plus"
							size={25}
							color={COLORS.white}
						/>
					),
					tabBarButton: (props) => (
						<TabBarCustomButton {...props} />
					),
				}}
			/>
			<Tab.Screen
				name="Search"
				component={Search}
				options={{
					tabBarIcon: ({ focused }) => (
						<Image
							source={focused ? ICONS.search_bold : ICONS.search_thin}
							style={[styles.iconStyle, {
								tintColor: focused ? COLORS.lightBlack : `${COLORS.lightBlack}60`,
							}]}
						/>
					),
					header: props => <Header headerText="Search" searchShow={true} />,
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={Settings}
				options={{
					tabBarIcon: ({ focused }) => (
						<Image
							source={focused ? ICONS.cog_fill : ICONS.cog_outline}
							style={[styles.iconStyle, {
								tintColor: focused ? COLORS.lightBlack : `${COLORS.lightBlack}60`,
							}]}
						/>
					),
					header: props => <Header headerText="Settings" />,
				}}
			/>
		</Tab.Navigator >
	);
};

export default Files;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	customTabBarButton: {
		width: 70,
		height: 70,
		top: -30,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.primary,
		borderRadius: 36,
		shadowColor: COLORS.primary,
		elevation: 30,
	},
	iconStyle: {
		height: 30,
		width: 30,
	},
});
