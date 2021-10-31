/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
} from 'react-native';
import { FolderView } from '../../components';
import { getUserFolders } from '../../api';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

const Folders = ({ navigation }) => {
	const currentUserToken = useSelector((state) => state.auth.userToken);
	const [folders, setFolders] = useState([]);
	useEffect(() => {
		getUserFolders(currentUserToken, getUsersFolders);
	}, [currentUserToken]);
	const getUsersFolders = (data) => {
		setFolders(data);
		console.log(data);
	};
	return (
		<View style={styles.container}>
			<FlatList
				data={folders}
				keyExtractor={({ id }, index) => id}
				renderItem={({ item }) => {
					return (
						<FolderView
							folderName={item.folderName}
							onFolderPress={() => navigation.navigate('Folder Contents')}

						/>
					);
				}}
			/>
		</View>
	);
};

export default Folders;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 50,
	},
});
