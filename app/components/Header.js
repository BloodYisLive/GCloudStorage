/* eslint-disable prettier/prettier */
import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TextInput,
} from 'react-native';
import { COLORS, SIZES, width, height } from '../constants';
import Svg, {
	Circle,
} from 'react-native-svg';

const Header = (props) => {
	const { headerText, searchShow } = props;
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
						height: searchShow ? (height * 24 / 100) : (height * 14 / 100),
					}]}>
						<Text style={styles.headerTitle}>{headerText}</Text>
						{searchShow && <TextInput
							style={styles.searchInput}
							placeholder="Search files by file name..."
						/>}
					</View>
				</View>
			</Svg>
		</View>
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
	},
});
