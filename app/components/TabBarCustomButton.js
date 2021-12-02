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
	Modal,
	Text,
	TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { COLORS, width } from '../constants';
import { createFolder, openDocSelector } from '../api';

const TabBarCustomButton = ({ children, onUploadDocPress }) => {
	const currentUserToken = useSelector((state) => state.auth.userToken);
	const currentFolderName = useSelector((state) => state.currentFolder.currentFolderName)
	const buttonSize = useRef(new Animated.Value(1)).current;
	const mode = useRef(new Animated.Value(0)).current;
	const [flag, setFlag] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [folderName, setFolderName] = useState('');

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
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>New Folder</Text>
						<TextInput
							style={styles.createFolderTextInput}
							placeholder="Enter folder name..."
							onChangeText={(e) => setFolderName(e)}
							value={folderName}
						/>
						<View style={styles.modalButtonContainer}>
							<TouchableOpacity
								style={styles.modalButtons}
								onPress={() => {
									setModalVisible(false);
									setFolderName('');
								}}
							>
								<Text style={{
									fontSize: 16,
									fontWeight: 'bold',
									color: COLORS.black,
								}}>CANCEL</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.modalButtons, {
								backgroundColor: COLORS.primary,
								borderRadius: 5,
							}]}
								onPress={() => {
									createFolder(currentUserToken, folderName);
									setModalVisible(false);
									setFolderName('');
								}}
							>
								<Text style={{
									fontSize: 16,
									fontWeight: 'bold',
									color: COLORS.white,
									paddingHorizontal: 20,
									paddingVertical: 10,
								}}>CREATE</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
			<Animated.View style={{
				position: 'absolute',
				left: createFolderX,
				top: createFolderY,
			}}>
				<TouchableOpacity style={styles.secondaryButton} onPress={() => setModalVisible(true)}>
					<Icon name="folder-plus" size={25} color={COLORS.white} />
				</TouchableOpacity>
			</Animated.View>
			<Animated.View style={{
				position: 'absolute',
				left: uploadDocX,
				top: uploadDocY,
			}}>
				<TouchableOpacity style={styles.secondaryButton} onPress={() => openDocSelector(currentUserToken, currentFolderName)}>
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
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: COLORS.white,
		borderRadius: 10,
		padding: 35,
		shadowColor: COLORS.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: width * 90 / 100,
		justifyContent: 'flex-start',
	},
	modalText: {
		fontSize: 20,
		color: COLORS.black,
		marginBottom: 20,
	},
	createFolderTextInput: {
		borderWidth: 2,
		borderColor: COLORS.primary,
		color: COLORS.black,
		fontSize: 20,
		paddingHorizontal: 10,
		paddingVertical: 5,
		width: '100%',
	},
	modalButtonContainer: {
		flexDirection: 'row',
		marginTop: 20,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	modalButtons: {
		marginHorizontal: 15,
	},
});
