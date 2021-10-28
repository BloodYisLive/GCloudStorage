/* eslint-disable prettier/prettier */
import React from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { FolderView } from '../../components';
const Folders = () => {
	return (
		<View style={styles.container}>
			<FolderView folderName="Folder Name" />
		</View>
	);
};

export default Folders;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
	},
});
