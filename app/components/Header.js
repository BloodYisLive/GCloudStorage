/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { currentFolderName } from '../redux/actions';
import { COLORS, SIZES, width, height } from '../constants';
import Svg, {
	Circle,
} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Entypo';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const Header = (props) => {
	const navigation = useNavigation();
	const { headerText, searchShow, backButton } = props;
	const dispatch = useDispatch();
	return (
		<View style={styles.container}>
			<Svg height={searchShow ? height * 25 / 100 : height * 15 / 100} width={width}>
				<Circle
					cx={width / 2}
					cy={`-${898 - (searchShow ? height * 25 / 100 : height * 15 / 100) + 2}`}
					r="898.5"
					fill={COLORS.primary}
				/>
				<View>
					<View style={[styles.subContainer, {
						height: (height * 14 / 100),
					}]}>
						<Text style={styles.headerTitle}>{headerText}</Text>
					</View>
				</View>
			</Svg>
			{searchShow &&
				<View style={{
					position: 'absolute',
					bottom: 25,
				}}>
					<TextInput
						style={styles.searchInput}
						placeholderTextColor={COLORS.lightBlack}
						placeholder="Search files by file name..."
					/>
				</View>
			}
			{backButton && <TouchableOpacity style={{
				position: 'absolute',
				left: 20,
				bottom: 51,
			}}
				onPress={() => {
					navigation.goBack();
					dispatch(currentFolderName(''));
				}}
			>
				<Icon name="chevron-thin-left" size={25} color={COLORS.white} />
			</TouchableOpacity>}
		</View >
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerTitle: {
		fontSize: 40,
		fontWeight: 'bold',
		color: COLORS.white,
	},
	subContainer: {
		width: width,
		justifyContent: 'center',
		alignItems: 'center',
	},
	searchInput: {
		width: width * 80 / 100,
		backgroundColor: COLORS.white,
		borderRadius: 36,
		marginVertical: 20,
		color: COLORS.black,
		zIndex: 99,
		paddingHorizontal: 20,
	},
});
