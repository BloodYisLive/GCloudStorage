/* eslint-disable prettier/prettier */
import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { COLORS } from '../constants';

const TabBarCustomButton = ({ children, onPress }) => {
	return (
		<TouchableOpacity
			style={[styles.customTabBarButton]}
			onPress={onPress}
		>
			{children}
		</TouchableOpacity>
	);
};

export default TabBarCustomButton;

const styles = StyleSheet.create({
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
});
