/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '_constants';

const FolderContents = () => {
	return (
		<View>
			<Text>FolderContents</Text>
		</View>
	);
};

export default FolderContents;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
});
