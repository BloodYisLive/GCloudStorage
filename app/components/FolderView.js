/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { COLORS, ICONS, SIZES } from '../constants';

const FolderView = (props) => {
	const [isVisible, setIsVisible] = useState(false);
	const { folderName, onFolderPress, onDeletePress } = props;
	return (
		<View style={styles.container}>
			<TouchableOpacity style={{
				flexDirection: 'row',
				alignItems: 'center',
			}}
				onPress={onFolderPress}
			>
				<Image
					source={ICONS.folder_solid}
					style={styles.folderImage}
				/>
				<Text style={styles.folderName}>{folderName}</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
				<Icon name="kebab-vertical" size={25} color={`${COLORS.black}60`} />
			</TouchableOpacity>
			{isVisible && <View style={styles.DeleteContainer}>
				<TouchableOpacity onPress={onDeletePress}>
					<Text style={styles.deleteContainerText}>Delete</Text>
				</TouchableOpacity>
			</View>}
		</View>
	);
};

export default FolderView;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 15,
	},
	folderImage: {
		height: 45,
		width: 45,
		tintColor: COLORS.primary,
	},
	folderName: {
		color: COLORS.lightBlack,
		fontSize: SIZES.h1,
		fontWeight: 'bold',
		marginLeft: 15,
	},
	DeleteContainer: {
		position: 'absolute',
		right: 10,
		top: 10,
		elevation: 10,
		backgroundColor: COLORS.white,
		paddingHorizontal: 40,
		paddingVertical: 8,
	},
	deleteContainerText: {
		color: COLORS.black,
	}
});
