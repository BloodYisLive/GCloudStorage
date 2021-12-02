/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
} from 'react-native';
import { currentFolderName } from '../../redux/actions';
import { FolderView } from '../../components';
import { getUserFolders } from '../../api';
import { useDispatch, useSelector } from 'react-redux';

const Folders = ({ navigation }) => {
	const currentUserToken = useSelector((state) => state.auth.userToken);
	const dispatch = useDispatch();
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
							onFolderPress={() => {
								navigation.navigate('Folder Items', {
								id: item.id,
								folderName: item.folderName,
							})
							dispatch(currentFolderName(item.id))
						}}
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
