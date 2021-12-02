/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
} from 'react-native';
import { COLORS } from '_constants';
import {FolderItemView} from '_components';
import { getFolderItems } from '../../api';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const FolderContents = ({route}) => {
	const {id, folderName} = route.params;
	const currentUserToken = useSelector((state) => state.auth.userToken);
	const [folderItems, setFolderItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	useEffect(() => {
		getFolderItems(currentUserToken, id, getUserFolderItems);
	}, [])
	useEffect(() => {
		checkExtension();
	}, [folderItems])
	const getUserFolderItems = (data) => {
		setFolderItems(data);
	}
	const checkExtension = async () => {
		const arr = await _.flatMap(folderItems, function(res) {
			const isImage = (/(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(res.fileName);
			return [{...res, isImage: isImage}];
		});
		setFilteredItems(arr);
		console.log(arr);
	}
	const fetchData = async () => {
		await getFolderItems(currentUserToken, id, getUserFolderItems);
		console.log('------>');
		checkExtension();
	}
	return (
		<View style={styles.container}>
			<FlatList
				data={filteredItems}
				keyExtractor={({id}, index) => id}
				renderItem={({item}) => {
					return(
						<FolderItemView
							itemName={item.fileName}
							isImage={item.isImage}
						/>
					)
				}}
			/>
		</View>
	);
};

export default FolderContents;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 50,
	},
});
