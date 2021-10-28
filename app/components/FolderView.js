/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
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
	return (
		<View style={styles.container}>
			<TouchableOpacity style={{
				flexDirection: 'row',
				alignItems: 'center',
			}}>
				<Image
					source={ICONS.folder_solid}
					style={styles.folderImage}
				/>
				<Text style={styles.folderName}>{props.folderName}</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Icon name="kebab-vertical" size={25} />
			</TouchableOpacity>
		</View>
	);
};

export default FolderView;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginHorizontal: 15,
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
});