import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { SIZES, COLORS, ICONS } from '../constants';
import Icon from 'react-native-vector-icons/Octicons';
const FolderItemView = (props) => {
    const {onItemPress, itemName, isImage} = props;

    return (
        <View style={styles.container}>
			<TouchableOpacity style={{
				flexDirection: 'row',
				alignItems: 'center',
			}}
				onPress={onItemPress}
			>
				<Image
					source={isImage ? ICONS.image_logo : ICONS.doc_logo}
					style={styles.folderImage}
				/>
				<Text style={styles.folderName}>{itemName}</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Icon name="kebab-vertical" size={25} color={`${COLORS.black}60`} />
			</TouchableOpacity>
		</View>
    )
}

export default FolderItemView;

const styles = StyleSheet.create({
    container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 15,
	},
	folderImage: {
		height: 40,
		width: 40,
	},
	folderName: {
		color: COLORS.lightBlack,
		fontSize: SIZES.h1,
		fontWeight: 'bold',
		marginLeft: 15,
	},
})
