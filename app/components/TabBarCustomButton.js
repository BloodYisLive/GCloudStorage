/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import {
	StyleSheet,
	View,
	Animated,
	TouchableOpacity,
	Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../constants';
const TabBarCustomButton = ({ children, onPress }) => {
	const buttonSize = useRef(new Animated.Value(1)).current;
	const mode = useRef(new Animated.Value(0)).current;
	const [flag, setFlag] = useState(false);

	const handlePress = async () => {
		await Animated.sequence([
			Animated.timing(buttonSize, {
				toValue: 0.95,
				duration: 80,
				useNativeDriver: false,
			}),
			Animated.timing(buttonSize, {
				toValue: 1,
				duration: 80,
				useNativeDriver: false,
			}),
			Animated.timing(mode, {
				toValue: flag ? 0 : 1,
				useNativeDriver: false,
			}),
		]).start();
		setFlag(!flag);
		console.log(flag);
	};

	const sizeStyle = {
		transform: [{ scale: buttonSize }],
	};

	const rotation = mode.interpolate({
		inputRange: [0, 1],
		outputRange: ['45deg', '0deg'],
	});

	const createFolderX = mode.interpolate({
		inputRange: [0, 1],
		outputRange: [-60, 10],
	});
	const createFolderY = mode.interpolate({
		inputRange: [0, 1],
		outputRange: [-70, -20],
	});
	const uploadDocX = mode.interpolate({
		inputRange: [0, 1],
		outputRange: [80, 10],
	});
	const uploadDocY = mode.interpolate({
		inputRange: [0, 1],
		outputRange: [-70, -20],
	});

	return (
		<View style={styles.container}>
			<Animated.View style={{
				position: 'absolute',
				left: createFolderX,
				top: createFolderY,
			}}>
				<TouchableOpacity style={styles.secondaryButton}>
					<Icon name="folder-plus" size={25} color={COLORS.white} />
				</TouchableOpacity>
			</Animated.View>
			<Animated.View style={{
				position: 'absolute',
				left: uploadDocX,
				top: uploadDocY,
			}}>
				<TouchableOpacity style={styles.secondaryButton}>
					<Icon name="upload" size={25} color={COLORS.white} />
				</TouchableOpacity>
			</Animated.View>
			<Animated.View style={[styles.customTabBarButton, sizeStyle]}>
				<Pressable onPress={handlePress}>
					<Animated.View style={{ transform: [{ rotate: rotation }] }}>
						{children}
					</Animated.View>
				</Pressable>
			</Animated.View>
		</View>
	);
};

export default TabBarCustomButton;

const styles = StyleSheet.create({
	container: {
		//position: 'absolute',
		alignItems: 'center',
	},
	customTabBarButton: {
		width: 72,
		height: 72,
		top: -30,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.primary,
		borderRadius: 36,
		shadowColor: COLORS.primary,
		elevation: 25,
	},
	secondaryButton: {
		position: 'absolute',
		height: 48,
		width: 48,
		backgroundColor: COLORS.primary,
		borderRadius: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
