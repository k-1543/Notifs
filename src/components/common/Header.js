/* eslint brace-style: [2, "allman"] */
import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) =>
{
	const { textStyle, viewStyle } = styles;
	return (
		<View style={viewStyle}>
			<Text style={textStyle}>{props.children}</Text>
		</View>
	);
};

const styles =
{
	textStyle:
	{
		fontSize: 20
	},
	viewStyle:
	{
		backgroundColor: '#00ddd2',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		elevation: 7,
		paddingTop: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.9,
		position: 'relative'
	}
};

export { Header };
